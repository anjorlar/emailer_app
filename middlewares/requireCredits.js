module.exports = (req, res, next) => {
    if (!req.user.credit < 1) {
        return res.status(403).send({
            error: true,
            message: "You don't have enough credit!"
        })
    }
    next();

};