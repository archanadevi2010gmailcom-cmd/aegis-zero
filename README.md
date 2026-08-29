
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

The agent runs on **TrueForge** at `localhost:8790`.

**To run the demo:**
1. Start TrueForge: `trueforge start`
2. Open `localhost:8790` in your browser
3. Select the `aegis-zero` agent
4. Type: *"Scan vulnerable_app.py for security issues"*
5. Agent scans, generates patch, and asks for your approval
6. Approve → real commit lands on GitHub ✅

**Web UI:** Open `index.html` for a standalone dashboard view of the same pipeline.

---

## 🏗️ Architecture

User → Web UI (index.html)
↓
TrueForge Agent (agent.js)
↓
┌────────────┬─────────────┐
│ scanner.js │ patcher.js │
│ (detect) │ (fix code) │
└────────────┴─────────────┘
↓
Human Approval Checkpoint
↓
GitHub API → Real Commit


---

## 🔍 Vulnerabilities Detected

| Type | Severity | Fix Applied |
|------|----------|-------------|
| SQL Injection | HIGH | Parameterized queries |
| Hardcoded Secrets | HIGH | Environment variables |
| Command Injection | HIGH | Safe alternatives |

---

## 🛠️ Tech Stack

- **TrueForge** — Agent orchestration, tool execution, sandboxing, human-in-the-loop
- **Qodo** — Automated PR code review and quality checks
- **GitHub MCP** — Real Git commits via GitHub REST API
- **Node.js** — Agent runtime and tool scripts
- **HTML/CSS/JS** — Web UI dashboard

---

## ⚙️ Setup & Run

### Prerequisites
- Node.js 18+
- WSL (Ubuntu) or Linux
- TrueForge CLI installed
- GitHub Personal Access Token

### Installation

```bash
git clone https://github.com/archanadevi2010gmailcom-cmd/aegis-zero.git
cd aegis-zero
npm install
```

### Run the Agent

```bash
trueforge run agent.js
```

### Open the Web UI

Open `index.html` in your browser directly.

---

## 🤖 How TrueForge Powers This

TrueForge is the core of Aegis Zero. It:
- **Orchestrates** the full scan → patch → test → commit pipeline
- **Sandboxes** all tool execution safely
- **Enforces human-in-the-loop** — the agent cannot commit without explicit approval
- **Spawns sub-agents** for specialized tasks (file writing, GitHub operations)
- **Connects tools** — scanner, patcher, and GitHub MCP work together seamlessly

---

## 🔎 How Qodo Improves Code Quality

Every pull request is automatically reviewed by Qodo, which:
- Flags security anti-patterns
- Suggests safer alternatives
- Verifies the patch doesn't introduce new issues
- Ensures test coverage for fixed vulnerabilities

---

## 📁 Project Structure

aegis-zero/
├── agent.js # Main TrueForge agent
├── index.html # Web UI dashboard
├── tools/
│ ├── scanner.js # Vulnerability detection
│ └── patcher.js # Secure patch generation
├── vulnerable_app.py # Demo target (intentionally vulnerable)
├── patched_app.py # Output after agent fixes
└── README.md


---

## 👤 Built By

**Aryan** — Solo submission for the Agent Harness Hackathon by WeMakeDevs × TrueForge

*Built with TrueForge, Qodo, and a lot of chai ☕*