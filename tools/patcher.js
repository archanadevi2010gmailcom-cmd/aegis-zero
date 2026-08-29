const fs = require("fs");

function patchFile(filePath) {
  let code = fs.readFileSync(filePath, "utf-8");
  let patches = [];

  // Fix SQL injection — replace string concatenation with parameterized query
  // Added leading whitespace (\s*) and fixed quote handling:
  // Changed the optional quote after the equals to required, and used non-greedy match for the second string literal.
  const sqlPattern = /\s*query\s*=\s*["']SELECT \* FROM users WHERE username = ["']\s*\+\s*username\s*\+\s*["'].*?["']\s*\ncursor\.execute\(query\)\s*/;
  if (sqlPattern.test(code)) {
    code = code.replace(
      sqlPattern,
      `query = "SELECT * FROM users WHERE username = ?"\ncursor.execute(query, (username,))`
    );
    patches.push("Fixed SQL injection — switched to parameterized query");
  }

  // Fix hardcoded secrets — replace with os.environ
  const secretPatterns = [
    { var: 'password', env: 'APP_PASSWORD' },
    { var: 'secret', env: 'APP_SECRET' },
    { var: 'api_key', env: 'APP_API_KEY' }
  ];
  for (const { var: v, env: e } of secretPatterns) {
    const regex = new RegExp(`\\b${v}\\b\\s*=\\s*["'][^"']+["']`, 'i');
    if (regex.test(code)) {
      // Add os import if not present
      if (!code.includes("import os")) {
        code = "import os\n" + code;
      }
      code = code.replace(regex, `${v} = os.environ.get("${e}")`);
      patches.push(`Fixed hardcoded ${v} — moved to environment variable`);
    }
  }

  // Return the patched code and patches for approval (don't write directly)
  return { filePath, patches, newCode: code };
}

module.exports = { patchFile };