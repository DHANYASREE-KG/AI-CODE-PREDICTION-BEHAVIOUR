const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle code analysis requests
app.post("/analyze", (req, res) => {
    const userCode = req.body.code;
    if (!userCode) {
        return res.status(400).json({ error: "❌ No code provided." });
    }

    // Save user code to a temp file
    const userCodeFile = path.join(__dirname, "user_code.py");
    fs.writeFileSync(userCodeFile, userCode);

    // Run the Python analysis script
    exec("python analyze.py", (error, stdout, stderr) => {
        if (error) {
            console.error("Execution Error:", error.message);
            return res.status(500).json({ error: "Error executing Python script." });
        }
        if (stderr) {
            console.error("Python Script Error:", stderr);
            return res.status(500).json({ error: "Error in Python script execution." });
        }

        try {
            // Ensure valid JSON response from Python script
            const result = JSON.parse(stdout.trim());

            // Debugging: Log the output to check if fixed_code is present
            console.log("✅ Backend Response:", result);

            res.json(result);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError.message);
            console.error("Python Output:", stdout);
            res.status(500).json({ error: "Invalid JSON response from Python script." });
        }
    });
});

// Default route for root URL
app.get("/", (req, res) => {
    res.send("✅ AI Code Behavior Predictor Backend is Running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://127.0.0.1:${PORT}`);
});
