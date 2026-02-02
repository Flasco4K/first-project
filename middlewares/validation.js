const Joi = require("joi");

const todoSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required().messages({
    "string.empty": "Baslik gereklidir",
    "string.min": "Baslik en az 1 karakter olmalidir",
    "string.max": "Baslik en fazla 200 karakter olabilir",
    "any.required": "Baslik gereklidir",
  }),
  completed: Joi.boolean().optional(),
});

const validation = (req, res, next) => {
  const { error, value } = todoSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message).join(", ");
    const err = new Error(messages);
    err.status = 400;
    return next(err);
  }

  req.body = value;
  next();
};

module.exports = validation;
