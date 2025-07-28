const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// Initialize the app
const app = express();
const port = 5510; // Changed the port to 5510

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/signupTest")
  .then(() => console.log("MongoDB Connected successfully."))
  .catch((error) => console.error("MongoDB connection error: ", error));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'login_page' folder
app.use(express.static(path.join(__dirname, "login_page")));

// Serve the home page (index.html) at the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle the Sign-Up logic
const User = require("./models/user"); // Import the user model

app.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send("Signup successful.");
  } catch (error) {
    console.error("Error during signup: ", error);
    res.status(500).send("Error saving user.");
  }
});

// Handle the sign-in page routing
app.get("/login_page/sign_in", (req, res) => {
  res.sendFile(path.join(__dirname, "login_page", "sign_in.html"));
});

// Handle Login logic (Authentication)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // If authentication succeeds, send success response
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Redirect to index.html after successful login
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
