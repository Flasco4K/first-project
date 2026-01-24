//Gelen request’i görmek
const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    console.log(method, url);
    next();
}

module.exports = logger;