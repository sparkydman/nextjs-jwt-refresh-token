const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username most be unique"],
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email most be unique"],
    trim: true,
    lowercase: true,
  },
  password: { type: String, require: [true, "Password is required"] },
  refreshToken: { type: String },
  date: { type: Date, default: Date.now },
});

// const encryptPassword = async function (next) {
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// };

// UserSchema.pre("save", encryptPassword);

module.exports = mongoose.model("user", UserSchema);
