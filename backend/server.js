import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import User from "./models/User.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key";

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connections
const db1 = mongoose.createConnection("mongodb+srv://touheedpasha17112004:2004@cluster0.t4wub.mongodb.net/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db1.on("connected", () => console.log("MongoDB (user) connected"));
db1.on("error", (err) => console.error("MongoDB (user) connection error:", err));

const db2 = mongoose.createConnection("mongodb+srv://varshini:admin@cluster0.xlcqu.mongodb.net/my-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db2.on("connected", () => console.log("MongoDB (my-database) connected"));
db2.on("error", (err) => console.error("MongoDB (my-database) connection error:", err));

console.log("Server started on port", PORT);

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await db1.model("User", User.schema).findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new (db1.model("User", User.schema))({ username, email, password: hashedPassword });

        await newUser.save();

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
        const user = await db1.model("User", User.schema).findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ message: "Error logging in", error: error.message });
    }
});

// Fetch Signup Data for Analytics
app.get('/user-stats', async (req, res) => {
    try {
        const userStats = await db1.model("User", User.schema).aggregate([
            {
                $group: {
                    _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.status(200).json(userStats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user stats", error: error.message });
    }
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, './')));

// The "catchall" handler: for any request that doesn't match one above, send back the React app.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
