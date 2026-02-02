const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email gereklidir"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Gecersiz email formati",
      ],
      index: true, //email alaninda index yapilabilir db performans icin
    },
    password: {
      type: String,
      required: [true, "Sifre gereklidir"],
      minLength: [6, "Sifre en az 6 karakter olmalidir"],
      select: false, // sifreyi burada select false yapmaliyiz
      //cunku login islemi disinda baska bir frontend isteginde sifre gelmemeli.
      //eger sifreye ihtiyacimiz varsa .select("+password") yapariz
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true, //bu alanin daha sonradan degistirilmemesi icin
    },
  },
  { timestamps: true, versionKey: false }, //__v alanini kaldirdim
);

userSchema.index({ email: 1 });

//istersen burayida kullanabilirsin her user objesi dondugunde sifreyi siler

// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete user.password;
//   return obj;
// };

module.exports = mongoose.model("User", userSchema);
