const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: "Kullanici Basariyla Olusturuldu", user: newUser });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        // 1. Kullanıcı Var mı Kontrolü ?
        if (!user) {
            const err = new Error("Böyle Bir Kullanici Bulunamadi");
            err.status = 404;
            return next(err);
        }

        // 2. Şifre Karşılaştırma
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const err = new Error("Hatali Sifre");
            err.status = 401;
            return next(err);
        }

        // 3. Token Oluşturma
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Giris Basarili",
            token: token
        });

    } catch (err) {
        next(err);
    }
};