const User = require("../models/user");

class UserRepository {
    async findByEmail(email) { 
        return User.findOne({ email }).select("+password");
    }

    async findById(id) {
        return User.findById(id)
    }

    async create(user){
        const createdUser = new User(user);
        return createdUser.save();
    }
};

module.exports = new UserRepository();





