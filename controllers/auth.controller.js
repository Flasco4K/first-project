const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const authService = require("../services/auth.service");

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Controller sadece Service'i çağırır ve sonucu bekler
        const user = await authService.register(email, password);

        res.status(201).json({ message: "Kullanici Basariyla Olusturuldu", user });

    } catch (err) {
        next(err); // Hata Service'den fırlatılır (throw), Controller yakalar ve next ile gönderir
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token } = await authService.login(email, password); 
        res.status(200).json({ message: "Giris Basarili", token: token });

    } catch (err) {
        next(err);
    }
};