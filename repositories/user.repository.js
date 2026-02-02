const User = require("../models/user");

class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findByEmailWithPassword(email) {
    return User.findOne({ email }).select("+password");
  }

  async findById(id) {
    return User.findById(id);
  }

  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  async update(id, userData) {
    return User.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return User.findByIdAndDelete(id);
  }

  async count() {
    return User.countDocuments();
  }
}

module.exports = new UserRepository();
