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
.catch(err => console.log("❌ Error:", err));

/* ================= SCHEMAS ================= */

// Report Schema
const reportSchema = new mongoose.Schema({
    name: String,
    location: String,
    issue: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model("Report", reportSchema);

// Suggestion Schema
const suggestionSchema = new mongoose.Schema({
    name: String,
    suggestion: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

/* ================= ROUTES ================= */

// Home test route
app.get("/", (req, res) => {
    res.send("Food Safety Backend Running");
});

// Add Report
app.post("/report", async (req, res) => {
    try {
        const newReport = new Report(req.body);
        await newReport.save();
        res.json({ message: "✅ Report Saved Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Reports
app.get("/reports", async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Suggestion
app.post("/suggestion", async (req, res) => {
    try {
        const newSuggestion = new Suggestion(req.body);
        await newSuggestion.save();
        res.json({ message: "✅ Suggestion Saved Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Suggestions
app.get("/suggestions", async (req, res) => {
    try {
        const suggestions = await Suggestion.find();
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* ================= SERVER ================= */

app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
});