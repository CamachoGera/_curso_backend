module.exports = function (req, res, next) {

    if(!req.originalUrl.includes("tasks")) return next();

    if(req.session.userId) return next();

    return res.redirect('/sessions');

}
