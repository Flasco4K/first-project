const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // 1. Header'dan bilet (token) kontrolü
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        const err = new Error("Yetkisiz Erisim: Token Bulunamadi");
        err.status = 401;
        return next(err);
    }
    // 2. "Bearer <token>" kısmını ayıklama
    const token = authHeader.split(" ")[1];

    if (!token) {
        const err = new Error("Yetkisiz Erisim: Gecersiz Token Bilgisi");
        err.status = 401;
        return next(err);
    }

    try {
        // 3. Token doğrula ve içindeki bilgiyi req.user'a at
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Artık kullanıcının ID'sine her yerden erişebiliriz

        next();
    } catch (err) {
        const error = new Error("Yetkisiz Erisim: Gecersiz veya Süresi Dolmus Token");
        error.status = 401;
        return next(error);
    }

};