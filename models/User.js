const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
    profile_image: String,
  },
  going: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },],
})

const User = mongoose.model("User", userSchema, "users")

module.exports = User