const rateLimit = require("express-rate-limit");

const throttle = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Cok fazla istek gonderdiniz, lutfen daha sonra tekrar deneyin",
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Cok fazla istek gonderdiniz, lutfen daha sonra tekrar deneyin",
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
    });
  },
  skip: (req) => {
    return process.env.NODE_ENV === "development";
  },
});

module.exports = throttle;
