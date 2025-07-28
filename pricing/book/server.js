const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // Import path module

const app = express();
const PORT = 3001;

// CORS options
const corsOptions = {
    origin: "http://127.0.0.1:5500", // Allow requests from this origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
};

// Use CORS middleware
app.use(cors(corsOptions));

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Replace with your MySQL username
    password: "avb@254943", // Replace with your MySQL password
    database: "travelpage"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the database.");
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from the current directory

// API route to handle booking
app.post("/api/book", (req, res) => {
    const { name, email, phone, upi_id, amount, comments } = req.body;

    const query = "INSERT INTO bookings (name, email, phone, upi_id, amount, comments) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [name, email, phone, upi_id, amount, comments], (err, result) => {
        if (err) {
            console.error("Error saving booking:", err);
            return res.status(500).json({ message: "Booking failed. Please try again." });
        }
        res.json({ message: "Booking successful!" });
    });
});

// API route to fetch all bookings
app.get("/api/bookings", (req, res) => {
    const query = "SELECT * FROM bookings";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching bookings:", err);
            return res.status(500).json({ message: "Failed to retrieve bookings." });
        }
        res.json(results); // Send results as JSON
    });
});

// Serve the HTML file on the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); // Update to match your HTML file name
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
