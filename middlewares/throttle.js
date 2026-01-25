const rateLimit = require("express-rate-limit");

const throttle = rateLimit({
    windowMs: 60 * 1000, // 1 dakika
    max: 5,              // max 5 istek
    message: "Çok fazla istek attın, biraz bekle"
});

module.exports = throttle;

