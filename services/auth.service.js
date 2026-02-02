const userRepository = require("../repositories/user.repository");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class AuthService {
    async register(email, password) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Böyle bir Kullanıcı Var"); //throw hatayı fırlat
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userRepository.create({ email, password: hashedPassword });
        return {
            id: newUser._id,
            email: newUser.email
        }
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);

        // Önce kullanıcı var mı diye bakıyoruz
        if (!user) {
            throw new Error("Böyle bir kullanıcı bulunamadı");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Şifreler Eşleşmiyor"); ""
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        return { token };
    }
};

module.exports = new AuthService();