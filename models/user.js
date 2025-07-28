const mongoose = require("mongoose");

// Create User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Export the User model
module.exports = mongoose.model("User", userSchema);
