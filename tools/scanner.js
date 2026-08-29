const fs = require("fs");

function scanFile(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");
  const issues = [];

  // Check for SQL injection
  if (/execute\s*\(\s*["'].*\+/.test(code) || /["'].*SELECT.*\+.*username/.test(code)) {
    issues.push({
      type: "SQL Injection",
      severity: "HIGH",
      description: "String concatenation used in SQL query — user input passed directly into execute(). Use parameterized queries instead.",
      line: code.split("\n").findIndex(l => l.includes("execute") && l.includes("+")) + 1
    });
  }

  // Check for hardcoded secrets
  const secretPatterns = [
    /password\s*=\s*["'][^"']+["']/i,
    /secret\s*=\s*["'][^"']+["']/i,
    /api_key\s*=\s*["'][^"']+["']/i,
  ];
  secretPatterns.forEach(pattern => {
    if (pattern.test(code)) {
      issues.push({
        type: "Hardcoded Secret",
        severity: "HIGH",
        description: "Sensitive value hardcoded in source. Use environment variables instead.",
        line: code.split("\n").findIndex(l => pattern.test(l)) + 1
      });
    }
  });

  return { filePath, issues };
}

module.exports = { scanFile };
