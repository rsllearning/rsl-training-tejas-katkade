const app = document.getElementById("app");

// Safely retrieve initial user data from secure JSON script tag
let initialUser = window.initialUser || null;
const initialUserScript = document.getElementById("initial-user");
if (initialUserScript) {
    try {
        initialUser = JSON.parse(initialUserScript.textContent);
    } catch (e) {
        console.error("Failed to parse initial user data:", e);
    }
}

const params = new URLSearchParams(window.location.search);

const username =
    params.get("name") ||
    initialUser?.name ||
    "Guest";

// Secure DOM manipulation using createElement and textContent.
// Fixes DOM-based XSS by treating untrusted URL input strictly as text,
// preventing browser execution of injected markup or script tags.
const profileCard = document.createElement("section");
profileCard.className = "profile-card";

const heading = document.createElement("h2");
heading.textContent = `Welcome, ${username}`;

const emailParagraph = document.createElement("p");
emailParagraph.textContent = `Email: ${initialUser?.email || "Unknown"}`;

const roleParagraph = document.createElement("p");
roleParagraph.textContent = `Role: ${initialUser?.role || "User"}`;

profileCard.appendChild(heading);
profileCard.appendChild(emailParagraph);
profileCard.appendChild(roleParagraph);

app.innerHTML = "";
app.appendChild(profileCard);

// Secure settings preparation.
// Fixes Prototype Pollution by using an explicit allowlist of expected keys
// and blocking dangerous prototype properties (__proto__, constructor, prototype).
function prepareSettings(userSettings) {
    const settings = {};
    const allowedKeys = ["theme", "language", "fontSize"];

    for (const key of allowedKeys) {
        if (Object.prototype.hasOwnProperty.call(userSettings, key)) {
            if (key !== "__proto__" && key !== "constructor" && key !== "prototype") {
                settings[key] = String(userSettings[key]);
            }
        }
    }

    return settings;
}

const saveButton = document.getElementById("save-settings");

saveButton.addEventListener("click", async () => {
    const theme = document.getElementById("theme").value;
    const language = document.getElementById("language").value;
    const fontSize = document.getElementById("fontSize").value;

    const settings = prepareSettings({
        theme,
        language,
        fontSize
    });

    try {
        const response = await fetch("/api/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(settings)
        });

        const result = await response.json();

        document.getElementById("settings-status").textContent =
            result.message;
    } catch (error) {
        document.getElementById("settings-status").textContent =
            "Unable to save settings.";
    }
});
