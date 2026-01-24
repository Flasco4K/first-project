//Yetkisiz erişimi engellemek -Kim bu? Girebilir mi ? Kontrolü
const auth = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        return res.status(401).json({ message: "Yetkisiz Erişim" });
    }

    next();
};

module.exports = auth;
