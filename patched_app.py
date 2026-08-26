import logging
import os
import re
import sqlite3
from typing import Any, Dict, Optional

DB_PATH: str = os.getenv("DB_PATH", "users.db")
USERNAME_PATTERN: re.Pattern = re.compile(r"^[a-zA-Z0-9_\-\.@]+$")
logger = logging.getLogger("AegisZero.UserService")

def get_user(username: str) -> Optional[Dict[str, Any]]:
    if not isinstance(username, str) or not USERNAME_PATTERN.match(username):
        raise ValueError("Invalid username")
    query = "SELECT id, username FROM users WHERE username = ?"
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute(query, (username,))
            row = cursor.fetchone()
            return dict(row) if row else None
    except sqlite3.Error as err:
        logger.error("Database error")
        return None

API_KEY: str = os.getenv("API_KEY", "")
DB_PASSWORD: str = os.getenv("DB_PASSWORD", "")
