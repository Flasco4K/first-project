const userRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      const err = new Error("Email zaten kullaniliyor");
      err.status = 409;
      return next(err);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Kullanici Basariyla Olusturuldu",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findByEmailWithPassword(email);

    if (!user) {
      const err = new Error("Boyle Bir Kullanici Bulunamadi");
      err.status = 404;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const err = new Error("Hatali Sifre");
      err.status = 401;
      return next(err);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Giris Basarili",
      token,
    });
  } catch (err) {
    next(err);
  }
};
