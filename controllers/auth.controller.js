const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
        //Token oluştur (jwt.sign kullanıyoruz)
        const token = jwt.sign(
            { id: user._id }, // Kimlik kartının içine kullanıcının ID'sini koyduk
            process.env.JWT_SECRET, // .env'den anahtarı aldık
            { expiresIn: "1h" } // Kartın son kullanma tarihini 1 saat yaptık
        );
        res.status(200).json({
            message: "Giris Basarili",
            token: token //Kullanıcıya kartını teslim ettik
        })

    } catch (err) {
        next(err);
    }
};