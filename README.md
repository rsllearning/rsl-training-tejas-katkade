# User Security Dashboard – Modern Front-End Security Concepts

A hardened **User Security Dashboard** built with Vanilla JavaScript, HTML, CSS, Node.js, and Express, demonstrating practical implementations of modern front-end security concepts and defense-in-depth principles.

### Technologies
- **HTML5 & CSS3**
- **Vanilla JavaScript (ES6+)**
- **Node.js & Express 5**

---

### Commands
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the application:**
   ```bash
   npm start
   ```
   Access the dashboard at `http://localhost:3000`.

3. **Run automated security test suite:**
   ```bash
   npm test
   ```

---

## Part A: Hands-On Security Code Review

All security findings for the code snippet provided in Part A are fully documented in [`answers.txt`](answers.txt).

### Summary of Findings:
- **Finding 1: Location.hash – Untrusted URL Data (DOM-Based XSS):** Direct injection of `location.hash` into `.innerHTML` enables arbitrary script execution. Remediated using `.textContent` or DOMPurify.
- **Finding 2: Prototype Pollution via `Object.assign`:** Unvalidated JSON copied into a plain object allows polluting `Object.prototype` via `__proto__` or `constructor`. Remediated using `Object.create(null)` and key allowlisting.
- **Finding 3: Uncaught SyntaxError / Client-Side DoS via `JSON.parse`:** Malformed storage data crashes script execution without a `try...catch` block.
- **Finding 4: Insecure Storage and Trust of `localStorage` Data:** Sensitive data in `localStorage` lacks access controls and is accessible to all client-side scripts.
- **Finding 5: Sensitive Data Exposure / Injection in `renderClient({ user })`:** Raw user object passed to client renderer without sanitization or DTO projection.
- **Finding 6: Unhandled Promise Rejection:** Asynchronous `await getUser()` call without `try...catch` leaves the UI in a broken state if the network request fails.

---

## Part B: Vulnerability Analysis, Fixes & Verification

### 1. DOM-Based Cross-Site Scripting (DOM XSS)

#### Vulnerable Code (`client/app.js`)
```javascript
const params = new URLSearchParams(window.location.search);
const username = params.get("name") || window.initialUser?.name || "Guest";

app.innerHTML = `
    <section class="profile-card">
        <h2>Welcome, ${username}</h2>
        <p>Email: ${window.initialUser?.email || "Unknown"}</p>
        <p>Role: ${window.initialUser?.role || "User"}</p>
    </section>
`;
```

#### Why it was Insecure
- **Source of untrusted data:** `window.location.search` (`params.get("name")`).
- **Sink:** `app.innerHTML`.
- **Risk:** User-supplied query parameters were directly interpolated into an HTML string assigned to `.innerHTML`. An attacker could craft a link such as `http://localhost:3000/?name=<img src=x onerror=alert(document.cookie)>` to execute arbitrary JavaScript in the victim's session.

#### Security Fix
Replaced raw string concatenation and `.innerHTML` with safe programmatic DOM creation using `document.createElement()` and `textContent`.

```javascript
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
```

#### Verification & Testing
- **Positive Test:** Navigating to `http://localhost:3000/?name=Alice` renders `Welcome, Alice` correctly.
- **Negative Test:** Navigating to `http://localhost:3000/?name=<img src=x onerror=alert(1)>` renders the raw string as text (`Welcome, <img src=x onerror=alert(1)>`) without executing any script or triggering an alert.

---

### 2. Prototype Pollution

#### Vulnerable Code (`client/app.js` and `server/server.js`)
```javascript
// client/app.js & server/server.js
for (const key in incomingSettings) {
    settings[key] = incomingSettings[key];
}
```

#### Why it was Insecure
- **Source of untrusted data:** Client POST request body (`req.body`).
- **Risk:** Iterating over object properties without filtering permits dangerous prototype properties such as `__proto__`, `constructor`, and `prototype`. In Node.js / JavaScript, this allows attackers to inject properties onto global `Object.prototype`, leading to logic bypasses, denial of service, or unauthorized attribute elevation.

#### Security Fix
1. **Explicit Prototype Property Blocking:** Rejects payloads containing `__proto__`, `constructor`, or `prototype` with HTTP 400 Bad Request.
2. **Strict Key and Value Allowlisting:** Only permits predefined setting keys (`theme`, `language`, `fontSize`) and validates their values against acceptable enum choices.

```javascript
// server/server.js
const ALLOWED_SETTINGS = {
    theme: ["light", "dark"],
    language: ["en", "fr"],
    fontSize: ["small", "medium", "large"]
};

app.post("/api/settings", (req, res) => {
    const incomingSettings = req.body;

    if (!incomingSettings || typeof incomingSettings !== "object" || Array.isArray(incomingSettings)) {
        return res.status(400).json({ message: "Invalid payload format." });
    }

    if (
        Object.prototype.hasOwnProperty.call(incomingSettings, "__proto__") ||
        Object.prototype.hasOwnProperty.call(incomingSettings, "constructor") ||
        Object.prototype.hasOwnProperty.call(incomingSettings, "prototype")
    ) {
        return res.status(400).json({ message: "Disallowed prototype property detected." });
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

    res.json({ message: "Settings saved successfully.", settings });
});
```

#### Verification & Testing
- **Positive Test:** Sending `POST /api/settings` with `{"theme": "dark", "language": "fr", "fontSize": "large"}` returns HTTP 200 with sanitized settings.
- **Negative Test:** Sending `POST /api/settings` with `{"__proto__": {"polluted": true}, "theme": "dark"}` is rejected with HTTP 400 (`Disallowed prototype property detected.`). Checking `({}).polluted` confirms the prototype remains unpolluted (`undefined`).

---

### 3. SSR Token Leakage

#### Vulnerable Code (`server/server.js`)
```javascript
const initialUserData = JSON.stringify(user);
res.send(`
    ...
    <script>
        window.initialUser = ${initialUserData};
    </script>
`);

app.get("/api/profile", (req, res) => {
    res.json(user);
});
```

#### Why it was Insecure
- **Vulnerability:** The entire server-side `user` object in `server/data.js`—including `sessionToken` (`TRAINING-FAKE-ACCESS-TOKEN-12345`) and `refreshToken` (`TRAINING-FAKE-REFRESH-TOKEN-67890`)—was stringified directly into the HTML response and exposed via global `window.initialUser` and the `/api/profile` endpoint.
- **Risk:** Sensitive authentication credentials were leaked in the HTML source code (viewable via `View Source`) and accessible to any client-side script or third-party dependency.

#### Security Fix
1. **Data Transfer Object (DTO) Sanitization:** Implemented `getPublicUserProfile()` helper to project only non-sensitive fields (`id`, `name`, `email`, `role`).
2. **Safe Hydration Container:** Stored initial user data inside a non-executable `<script id="initial-user" type="application/json">` tag, preventing inline script execution.
3. **Escaped HTML Characters:** Replaced `<` with `\u003c` in serialized JSON to prevent `<script>` breakout attacks.

```javascript
function getPublicUserProfile(userData) {
    if (!userData) return null;
    const { id, name, email, role } = userData;
    return { id, name, email, role };
}

// In app.get("/"):
const safeUserData = JSON.stringify(getPublicUserProfile(user)).replace(/</g, "\\u003c");
// Rendered as:
// <script id="initial-user" type="application/json">${safeUserData}</script>
```

#### Verification & Testing
- **Positive Test:** Dashboard continues to render the user's name ("John Doe"), email, and role ("Administrator") seamlessly.
- **Negative Test:** Searching the raw HTML response or `/api/profile` payload confirms neither `sessionToken` nor `refreshToken` appears anywhere in the client-accessible output.

---

### 4. Content Security Policy (CSP)

#### Vulnerable Code
- The original application had **no CSP header** configured.
- Inline `<script>` tags were used on `/` and `/account`.

#### Why it was Insecure
- Without a Content Security Policy, the browser executes any script injected via DOM XSS or third-party resources without restrictions.

#### Security Fix
1. **Configured Strict CSP Header via Middleware:**
   ```javascript
   res.setHeader(
       "Content-Security-Policy",
       "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';"
   );
   ```
2. **Eliminated Inline Scripts:**
   - Moved the inline `/account` script into [`client/account.js`](client/account.js).
   - Switched server hydration on `/` to non-executable `<script type="application/json">`.
   - Enabled strict `script-src 'self'` without requiring `'unsafe-inline'`.

#### Verification & Testing
- **Positive Test:** External scripts (`/app.js` and `/account.js`) load and execute successfully from `'self'`.
- **Negative Test:** Injected inline scripts (such as `<script>alert(1)</script>`) are blocked by the browser with a CSP violation report.

---

### 5. Clickjacking

#### Vulnerable Code
- The `/account` page contained a critical action button (`Delete Account`) without any framing protections or headers.
- Tested via `test/iframe-test.html`, which freely embedded the account page inside an `<iframe>`.

#### Why it was Insecure
- Malicious external websites could embed `http://localhost:3000/account` inside a transparent iframe, tricking authenticated users into clicking the "Delete Account" button (UI redressing / Clickjacking).

#### Security Fix
Implemented two complementary defense layers:
1. **Modern Standard:** `frame-ancestors 'none'` within the `Content-Security-Policy` header.
2. **Legacy Standard:** `X-Frame-Options: DENY` header for older browser compatibility.

```javascript
res.setHeader("X-Frame-Options", "DENY");
// and in CSP: frame-ancestors 'none';
```

#### Verification & Testing
- **Positive Test:** Accessing `http://localhost:3000/account` directly in the browser works normally.
- **Negative Test:** Loading `test/iframe-test.html` fails to embed the page. The browser refuses framing with:
  `Refused to display 'http://localhost:3000/account' in a frame because it set 'X-Frame-Options' to 'deny'`.

---

## Defense-in-Depth Approach

Rather than relying on a single security mechanism, this implementation applies multiple overlapping security controls:

| Security Threat | Primary Defense | Secondary / Fallback Defense |
| :--- | :--- | :--- |
| **Cross-Site Scripting (XSS)** | Safe DOM APIs (`textContent`, `createElement`) | Strict Content Security Policy (`script-src 'self'`) |
| **Clickjacking** | CSP `frame-ancestors 'none'` directive | HTTP `X-Frame-Options: DENY` header |
| **Prototype Pollution** | Prototype key rejection (`__proto__`, `constructor`) | Strict allowlist filtering and value validation |
| **Token Exposure** | Server-side DTO sanitization (`getPublicUserProfile`) | Safe JSON hydration container (`type="application/json"`) |
| **MIME Sniffing** | Correct MIME types served by Express | `X-Content-Type-Options: nosniff` header |

---

## Testing

Automated test execution output from `npm test`:

```
> modern-frontend-security@1.0.0 test
> node test/security-test.js

Starting server for test execution on port 3000...
====================================================
       SECURITY REFINEMENTS VERIFICATION SUITE       
====================================================

1. SSR Token Leakage Check (HTML Home Page Source):
   - Session token in HTML: PASS (NOT LEAKED)
   - Refresh token in HTML: PASS (NOT LEAKED)
   - Contains safe initial-user JSON tag: PASS

2. Profile API (/api/profile) Output:
   - sessionToken present: PASS (STRIPPED)
   - refreshToken present: PASS (STRIPPED)
   - Public fields intact (name, role): PASS
   - Payload: { id: 101, name: 'John Doe', email: 'john@example.com', role: 'Administrator' }

3. Security Headers Check:
   - Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Clickjacking frame-ancestors none: PASS
   - X-Frame-Options DENY: PASS
   - CSP script-src self restriction: PASS

4. Account Page (/account) Clickjacking Protection:
   - X-Frame-Options on /account: PASS (DENY)
   - frame-ancestors none on /account: PASS

5. Prototype Pollution Defense on POST /api/settings:
   - Attack payload status code: 400 PASS (BLOCKED 400)
   - Rejection message: Disallowed prototype property detected.
   - Global Object.prototype.polluted: PASS (NOT POLLUTED)

6. Valid Settings Submission (Functional Regression Test):
   - Status code: 200 PASS (200 OK)
   - Message: Settings saved successfully.
   - Returned settings: { theme: 'dark', language: 'fr', fontSize: 'large' }

====================================================
                 ALL TESTS PASSED                   
====================================================
```
