const express = require("express");
const path = require("path");

const { user, defaultSettings } = require("./data");

const app = express();
const PORT = 3000;

app.use(express.json());

/*
 * Global Security Middleware:
 * 1. Content Security Policy (CSP): Prevents XSS, controls resource loading.
 * 2. Clickjacking Protection: X-Frame-Options + CSP frame-ancestors.
 * 3. MIME-Sniffing Protection: X-Content-Type-Options.
 */
app.use((req, res, next) => {
    // Defense-in-depth: Strict Content Security Policy
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';"
    );

    // Defense-in-depth: Prevent clickjacking across modern and legacy browsers
    res.setHeader("X-Frame-Options", "DENY");

    // Prevent MIME-type sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");

    next();
});

/*
 * Helper: Sanitizes user data for public SSR and API responses.
 * Fixes SSR Token Leakage by stripping sensitive session and refresh tokens.
 */
function getPublicUserProfile(userData) {
    if (!userData) return null;
    const { id, name, email, role } = userData;
    return { id, name, email, role };
}

/*
 * Home page (Dashboard)
 */
app.get("/", (req, res) => {
    // Safely expose only public profile information; sensitive tokens are stripped
    const safeUserData = JSON.stringify(getPublicUserProfile(user)).replace(/</g, "\\u003c");

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >
            <title>User Security Dashboard</title>
            <link rel="stylesheet" href="/styles.css">
        </head>

        <body>
            <header class="header">
                <h1>User Security Dashboard</h1>
                <nav>
                    <a href="/">Dashboard</a>
                    <a href="/account">Account Settings</a>
                </nav>
            </header>

            <main class="container">
                <div id="app"></div>

                <section class="settings">
                    <h2>User Settings</h2>

                    <label>
                        Theme:
                        <select id="theme">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </label>

                    <label>
                        Language:
                        <select id="language">
                            <option value="en">English</option>
                            <option value="fr">French</option>
                        </select>
                    </label>

                    <label>
                        Font Size:
                        <select id="fontSize">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </label>

                    <button id="save-settings">
                        Save Settings
                    </button>

                    <p id="settings-status"></p>
                </section>
            </main>

            <!-- Secure data hydration via non-executable JSON script tag -->
            <script id="initial-user" type="application/json">${safeUserData}</script>

            <script src="/app.js"></script>
        </body>
        </html>
    `);
});

/*
 * Profile API
 * Exposes only safe public profile data.
 */
app.get("/api/profile", (req, res) => {
    res.json(getPublicUserProfile(user));
});

/*
 * Settings API
 */
const ALLOWED_SETTINGS = {
    theme: ["light", "dark"],
    language: ["en", "fr"],
    fontSize: ["small", "medium", "large"]
};

app.get("/api/settings", (req, res) => {
    res.json(defaultSettings);
});

/*
 * Settings POST API
 * Fixes Prototype Pollution by:
 * 1. Blocking dangerous prototype keys (__proto__, constructor, prototype)
 * 2. Validating keys against an explicit allowlist
 * 3. Enforcing validated allowed values
 */
app.post("/api/settings", (req, res) => {
    const incomingSettings = req.body;

    if (!incomingSettings || typeof incomingSettings !== "object" || Array.isArray(incomingSettings)) {
        return res.status(400).json({ message: "Invalid payload format." });
    }

    // Explicit check to block prototype pollution keys
    if (
        Object.prototype.hasOwnProperty.call(incomingSettings, "__proto__") ||
        Object.prototype.hasOwnProperty.call(incomingSettings, "constructor") ||
        Object.prototype.hasOwnProperty.call(incomingSettings, "prototype")
    ) {
        return res.status(400).json({
            message: "Disallowed prototype property detected."
        });
    }

    const settings = {};

    for (const [key, allowedValues] of Object.entries(ALLOWED_SETTINGS)) {
        if (Object.prototype.hasOwnProperty.call(incomingSettings, key)) {
            const val = incomingSettings[key];
            if (allowedValues.includes(val)) {
                settings[key] = val;
            }
        }
    }

    res.json({
        message: "Settings saved successfully.",
        settings
    });
});

/*
 * Account page
 * Protected against clickjacking via CSP frame-ancestors 'none' and X-Frame-Options: DENY.
 * Inline script moved to external /account.js to comply with strict script-src 'self' CSP.
 */
app.get("/account", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >
            <title>Account Settings</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #f4f4f4;
                    margin: 0;
                    padding: 40px;
                }

                .account-card {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                }

                .danger {
                    background: #c62828;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    cursor: pointer;
                    border-radius: 4px;
                }
            </style>
        </head>

        <body>
            <div class="account-card">
                <h1>Account Settings</h1>

                <p>
                    <strong>Name:</strong>
                    ${user.name}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${user.email}
                </p>

                <p>
                    <strong>Role:</strong>
                    ${user.role}
                </p>

                <button
                    id="delete-account"
                    class="danger"
                >
                    Delete Account
                </button>

                <p id="status"></p>
            </div>

            <script src="/account.js"></script>
        </body>
        </html>
    `);
});

app.use(express.static(path.join(__dirname, "..", "client")));

app.listen(PORT, () => {
    console.log(`Application running at http://localhost:${PORT}`);
});
