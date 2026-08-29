const fs = require("fs");

function scanFile(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");
  const issues = [];

  // Check for SQL injection - fixed regex to require + inside string literal
  const sqlPattern1 = /execute\s*\(\s*["'][^"']*\+[^"']*["']/
  const sqlPattern2 = /["'][^"']*SELECT[^"']*\+[^"']*username[^"']*["']/
  if (sqlPattern1.test(code) || sqlPattern2.test(code)) {
    const lines = code.split("\n");
    const lineIndex = lines.findIndex(l => 
      sqlPattern1.test(l) || sqlPattern2.test(l)
    );
    if (lineIndex >= 0) {
      issues.push({
        type: "SQL Injection",
        severity: "HIGH",
        description: "String concatenation used in SQL query — user input passed directly into execute(). Use parameterized queries instead.",
        line: lineIndex + 1
      });
    }
  }

  // Check for hardcoded secrets - fixed regex to avoid string literals and skip comments
  const secretPatterns = [
    /(?<!["'])\bpassword\s*=\s*["'][^"']+["'](?!['"])/i,
    /(?<!["'])\bsecret\s*=\s*["'][^"']+["'](?!['"])/i,
    /(?<!["'])\bapi_key\s*=\s*["'][^"']+["'](?!['"])/i,
  ];
  secretPatterns.forEach(pattern => {
    if (pattern.test(code)) {
      const lines = code.split("\n");
      const lineIndex = lines.findIndex(l => 
        !/^\s*\/\//.test(l) && pattern.test(l)
      );
      if (lineIndex >= 0) {
        issues.push({
          type: "Hardcoded Secret",
          severity: "HIGH",
          description: "Sensitive value hardcoded in source. Use environment variables instead.",
          line: lineIndex + 1
        });
      }
    }
  });

  return { filePath, issues };
}

module.exports = { scanFile };