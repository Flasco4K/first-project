const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    const err = new Error("Yetkisiz Erisim: Token Bulunamadi");
    err.status = 401;
    return next(err);
  }

  if (!authHeader.startsWith("Bearer ")) {
    const err = new Error("Yetkisiz Erisim: Gecersiz Token Formati");
    err.status = 401;
    return next(err);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    const err = new Error("Yetkisiz Erisim: Token Bulunamadi");
    err.status = 401;
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const error = new Error(
      "Yetkisiz Erisim: Gecersiz veya Suresi Dolmus Token",
    );
    error.status = 401;
    return next(error);
  }
};
