const API_BASE = "http://localhost:5000";

/* ===== REPORT FORM ===== */
const reportForm = document.getElementById("reportForm");

if (reportForm) {
    reportForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: reportForm.name.value,
            location: reportForm.location.value,
            issue: reportForm.issueDescription.value
        };

        try {
            const res = await fetch(`${API_BASE}/report`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            alert(result.message);
            reportForm.reset();

        } catch (err) {
            alert("Error: " + err.message);
        }
    });
}

/* ===== SUGGESTION FORM ===== */
const suggestionForm = document.getElementById("suggestionForm");

if (suggestionForm) {
    suggestionForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: suggestionForm.name.value,
            suggestion: suggestionForm.suggestion.value
        };

        try {
            const res = await fetch(`${API_BASE}/suggestion`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            alert(result.message);
            suggestionForm.reset();

        } catch (err) {
            alert("Error: " + err.message);
        }
    });
}

/* ===== LOAD REPORTS (OPTIONAL TABLE) ===== */
const reportsTable = document.getElementById("reportsTable");

if (reportsTable) {
    async function loadReports() {
        const tbody = reportsTable.querySelector("tbody");
        tbody.innerHTML = "";

        try {
            const res = await fetch(`${API_BASE}/reports`);
            const data = await res.json();

            data.forEach(r => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${r.name}</td>
                    <td>${r.location}</td>
                    <td>${r.issue}</td>
                    <td>${new Date(r.date).toLocaleString()}</td>
                `;
                tbody.appendChild(tr);
            });

        } catch (err) {
            console.error(err);
        }
    }

    loadReports();
}