const auth = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: "Yetkisiz erişim" });
    }

    next();
};

module.exports = auth;
