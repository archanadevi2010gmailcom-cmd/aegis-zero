# 🛡️ Aegis Zero

**Autonomous DevSecOps remediation agent built on TrueForge**

Aegis Zero scans your Python code for security vulnerabilities, generates patches, writes tests, and commits fixes to GitHub — all autonomously, with a human-in-the-loop approval step before any change is made.

---

## 🎯 What It Does

1. **Scans** your codebase for security vulnerabilities (SQL injection, hardcoded secrets, command injection)
2. **Generates a secure patch** — rewrites vulnerable code using safe patterns
3. **Shows a diff** — you see exactly what changed before anything is applied
4. **Asks for human approval** — the agent pauses and waits for your decision
5. **Commits to GitHub** — applies the fix with a real Git commit if you approve

---

## 🚀 Live Demo

Open `index.html` in your browser for the full web UI:
- Paste any Python code
- Click **Scan for Vulnerabilities**
- Review findings (SQL Injection, Hardcoded Secrets)
- Click **Generate Patch** to see the secure diff
- Click **Approve & Commit to GitHub** to apply the fix

---

## 🏗️ Architecture
