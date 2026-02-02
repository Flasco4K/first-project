const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRepository = require("../repositories/user.repository");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        const err = new Error("Yetkisiz Erisim: Token Bulunamadi");
        err.status = 401;
        return next(err);
    }

    // BURAYA DİKKAT: 'token' değişkenini burada oluşturuyoruz
    const token = authHeader.split(" ")[1]; 

    if (!token) {
        const err = new Error("Yetkisiz Erisim: Gecersiz Token Bilgisi");
        err.status = 401;
        return next(err);
    }

    try {
        // 'token' yukarıda tanımlandığı için artık burada hata vermez
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        // Hata buraya düşerse 'token' hala yukarıdaki kapsamda (scope) olmalı
        console.log("TERMİNAL HATASI:", err.message); 
        const error = new Error("Yetkisiz Erisim: Gecersiz veya Süresi Dolmus Token");
        error.status = 401;
        return next(error);
    }
};