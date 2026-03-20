const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DATABASE CONNECTION ================= */
mongoose.connect("mongodb://127.0.0.1:27017/foodSafetyDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Database Error:", err));

/* ================= SCHEMAS ================= */

// Report Schema
const reportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    issue: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Report = mongoose.model("Report", reportSchema);

// Suggestion Schema
const suggestionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    suggestion: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

/* ================= ROUTES ================= */

// Home route
app.get("/", (req, res) => {
    res.send("🚀 Food Safety Backend Running");
});

// Add Report
app.post("/report", async (req, res) => {
    try {
        const { name, location, issue } = req.body;

        if (!name || !location || !issue) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newReport = new Report({ name, location, issue });
        await newReport.save();

        res.json({ message: "✅ Report Saved Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Get Reports
app.get("/reports", async (req, res) => {
    try {
        const reports = await Report.find().sort({ date: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: "Error fetching reports" });
    }
});

// Add Suggestion
app.post("/suggestion", async (req, res) => {
    try {
        const { name, suggestion } = req.body;

        if (!name || !suggestion) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newSuggestion = new Suggestion({ name, suggestion });
        await newSuggestion.save();

        res.json({ message: "✅ Suggestion Saved Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Get Suggestions
app.get("/suggestions", async (req, res) => {
    try {
        const suggestions = await Suggestion.find().sort({ date: -1 });
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching suggestions" });
    }
});

/* ================= SERVER ================= */
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});