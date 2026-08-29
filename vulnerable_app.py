import os
import subprocess

# Hardcoded secret - vulnerability 1
DB_PASSWORD = "supersecret123"
API_KEY = "hardcoded-api-key-abc"

def run_command(user_input):
    # Vulnerable: directly concatenates user input into shell command
    os.system("echo " + user_input)

def get_user(username):
    # SQL Injection vulnerability
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    return query

if __name__ == "__main__":
    user = input("Enter text: ")
    run_command(user)
    print(get_user(user))
