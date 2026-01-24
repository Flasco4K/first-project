const validation = (req, res, next) => {
    const { title } = req.body;
    if (!title || title === "") return res.status(400).json({ message: "Title Girmek Zorunlu" });
    next();

};
module.exports = validation;