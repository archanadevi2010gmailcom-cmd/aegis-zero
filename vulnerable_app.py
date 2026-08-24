import sqlite3

def get_user(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    # VULNERABILITY: SQL Injection
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    cursor.execute(query)
    return cursor.fetchone()

# VULNERABILITY: Hardcoded secret
API_KEY = "sk-prod-12345-super-secret-key"
DB_PASSWORD = "admin123"
