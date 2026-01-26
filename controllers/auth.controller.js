const User = require("../models/user");

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username,
            email,
            password
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

        if (!user) { //User Boşsa
            const err = new Error("Böyle Bir Kullanici Bulunamadi");
            err.status = 404;
            return next(err);

        } else if (user.password != password) { //Şifreler DB`deki ile Eşleşmiyorsa
            const err = new Error("Hatali Sifre");
            err.status = 401;
            return next(err);
        }
        res.status(200).json({
            message: "Giris Basarili",
            userName: user.username
        })

    } catch (err) {
        next(err);
    }
};