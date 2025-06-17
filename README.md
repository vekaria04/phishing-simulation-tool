# 🎯 Phishing Simulation Tool

A full-stack phishing simulation app that sends realistic phishing emails, tracks user interaction (opens, clicks, credential submissions), and educates users on phishing awareness — perfect for internal training or cybersecurity demos.

---

## 🛠 Features

- ✅ Send simulated phishing emails with embedded tracking links
- ✅ Track opens (via invisible pixel) and clicks (via URL query)
- ✅ Capture fake credential submissions (email + password)
- ✅ Log IP addresses and browser user agents
- ✅ Display a phishing awareness education page after submission
- ✅ Fully self-hosted using Node.js, Express, and MongoDB
- ✅ Clean dark-themed UI with phishing alert aesthetics

---

## 📦 Tech Stack

- **Frontend**: HTML, CSS (inline), JavaScript
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Email**: Nodemailer with Gmail SMTP
- **Tracking**: Custom pixel + query-based logging

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vekaria04/phishing-simulation-tool.git
cd phishing-simulation-tool

### 2. Install Dependancies
npm install

### 3. Environment Variables
Create a .env file in the server/ directory:
MONGO_URI=mongodb://localhost:27017/phishingSim
SMTP_USER=youremail@gmail.com
SMTP_PASS=your_app_password
BASE_URL=http://localhost:3000
⚠️ Use App Passwords for Gmail SMTP — never use your actual Gmail password.

### 🗄️ Start MongoDB
mongod

### ▶️ Run the Server
npm run dev

### ✉️ Send a Test Email
Open this in your browser:
http://localhost:3000/api/track/send?email=target@example.com
This sends a simulated phishing email with an embedded link and tracking pixel.

### 🧠 Education Page
After users submit credentials, they are redirected to a phishing awareness page (info.html) that educates them on how to spot and avoid phishing attacks. This reinforces training and good security habits.

### ⚠️ Disclaimer
This tool is for educational and ethical use only.
Do not deploy or test on real users or networks without explicit permission.
