const fs = require("fs");

function patchFile(filePath) {
  let code = fs.readFileSync(filePath, "utf-8");
  let patches = [];

  // Fix SQL injection — replace string concatenation with parameterized query
  const sqlPattern = /query\s*=\s*["']SELECT \* FROM users WHERE username = '"?\s*\+\s*username\s*\+\s*"'["']\s*\ncursor\.execute\(query\)/;
  if (sqlPattern.test(code)) {
    code = code.replace(
      sqlPattern,
      `query = "SELECT * FROM users WHERE username = ?"\ncursor.execute(query, (username,))`
    );
    patches.push("Fixed SQL injection — switched to parameterized query");
  }

  // Fix hardcoded secrets — replace with os.environ
  if (/password\s*=\s*["'][^"']+["']/i.test(code)) {
    // Add os import if not present
    if (!code.includes("import os")) {
      code = "import os\n" + code;
    }
    code = code.replace(
      /password\s*=\s*["'][^"']+["']/i,
      'password = os.environ.get("APP_PASSWORD")'
    );
    patches.push("Fixed hardcoded password — moved to environment variable");
  }

  if (patches.length > 0) {
    fs.writeFileSync(filePath, code, "utf-8");
  }

  return { filePath, patches };
}

module.exports = { patchFile };
