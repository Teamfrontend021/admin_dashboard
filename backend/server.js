import express from "express";
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname } from 'path'; // Import dirname

const __filename = fileURLToPath(import.meta.url); // Define __filename
const __dirname = dirname(__filename); // Define __dirname

import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import User from "./models/User.js";

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key"; // Change this in production

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://varshini:admin@cluster0.xlcqu.mongodb.net/my-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

console.log("Server started on port", PORT);

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "1h" });

        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ message: "Error logging in", error: error.message });
    }
});

app.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from headers
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id).select("-password"); // Exclude password from response
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            name: user.username,
            email: user.email,
            avatar: user.avatar // Assuming avatar is a field in the User model
        });
    } catch (error) {
        res.status(400).json({ message: "Error fetching user profile details", error: error.message });
    }
});

import path from "path"; // Import path module

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't match one above, send back the React app.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start Server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});