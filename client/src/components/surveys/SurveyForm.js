//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import _ from 'lodash'
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields'


class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat black-text">
                        <i className="material-icons left">cancel</i>
                        Cancel
                    </Link>
                    <button className="teal btn-flat right black-text" type="submit">
                        Next
                    <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');
    _.each(formFields, ({ name }) => {
        if (!values[name]) { //using the name to iterate over the destructed object {name} from the formFields array
            errors[name] = `${name} is required`;
        }
    })
    return errors;
}

export default reduxForm({
    validate, // used ES6 to turn validate:'validate' to validate
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);