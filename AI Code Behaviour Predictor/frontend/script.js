document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Frontend Loaded Successfully!");
});

function analyzeCode() {
    let codeInput = document.getElementById("codeInput").value.trim();
    let resultDiv = document.getElementById("result");
    let fixButton = document.getElementById("fixButton");

    if (!codeInput) {
        alert("❌ Please enter some Python code before analyzing.");
        return;
    }

    // Show "Analyzing..." message
    resultDiv.innerHTML = `<p>🔍 Analyzing code... Please wait.</p>`;
    fixButton.style.display = "none"; // Hide fix button until analysis completes

    fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeInput }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Backend Response:", data);

            if (!data || Object.keys(data).length === 0) {
                resultDiv.innerHTML = `<p>❌ No response from backend. Please check server logs.</p>`;
                return;
            }

            // Construct analysis results
            let analysisResults = `
                <p>✅ <b>Errors:</b> ${data.errors}</p>
                <p>⚡ <b>Performance:</b> ${data.performance || "⚠️ Not Available"}</p>
                <p>⏳ <b>Complexity:</b> ${data.complexity || "⚠️ Not Available"}</p>
                <p>📦 <b>Memory Usage:</b> ${data.memory_usage || "⚠️ Not Available"}</p>
                <p>🔐 <b>Security Risks:</b> ${data.security_risks ? data.security_risks.join(", ") : "⚠️ Not Available"}</p>
                <p>🗑️ <b>Unused Variables:</b> ${data.unused_variables ? data.unused_variables.join(", ") : "⚠️ Not Available"}</p>
                <p>💡 <b>AI Suggestions:</b> ${data.ai_suggestions ? data.ai_suggestions.join(", ") : "⚠️ Not Available"}</p>
            `;

            resultDiv.innerHTML = analysisResults;

            // If AI suggested a fix, show the button
            if (data.fixed_code && data.fixed_code !== codeInput) {
                fixButton.style.display = "block";
                fixButton.onclick = () => applyFix(data.fixed_code);
            }
        })
        .catch(error => {
            console.error("❌ Error in Analysis:", error);
            resultDiv.innerHTML = `<p>❌ Error analyzing code. Please try again.</p>`;
        });
}

function applyFix(fixedCode) {
    // Format the AI-suggested code properly
    let formattedCode = fixedCode.replace(/\\n/g, "\n").replace(/\\t/g, "\t");

    // Update the text area with the fixed code
    document.getElementById("codeInput").value = formattedCode;

    // Automatically trigger re-analysis after applying fix
    analyzeCode();
}

