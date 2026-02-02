const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Bir hata oluştu";

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;

//NOT : BURASIDA IYILESTIRILEBILIR
