const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');

const Survey = mongoose.model('surveys')
module.exports = app => {

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({
                recipients: false
            });
        res.send(surveys);
    })


    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting')
    })

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        const events = _.chain(req.body) // the lodash chain helper in use
            .map(({ email, url }) => { // email and url destructured from event in req.body
                const match = p.test(new URL(url).pathname)
                if (match) {
                    return { email: email, surveyId: match.surveyId, choice: match.choice };
                };
            })
            .compact() // _.compact Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey. gotten from lodash
            .uniqBy('email', 'surveyId') // _.uniqBy This method is like _.uniq except that it accepts iteratee which is invoked for each element in array to generate the criterion by which uniqueness is computed. The iteratee is invoked with one argument: (value).
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {
                            email: email, responded: false
                        }
                    }
                }, {
                    $inc: { [choice]: 1 }, // the [choice] passes the values of yes or no into and it increases it by 1 it does not create a new array
                    $set: { 'recipients.$.responded': true }, //update the recipients we found in the find query to true
                    lastResponded: new Date()
                }).exec() //.exec it executes the query
            })
            .value();
        res.send({})
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body

        const survey = new Survey({
            title: title,
            subject,
            body: body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
        })

        //Where to send a mail
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err)
        }
    })
};