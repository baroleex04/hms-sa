import bcrypt
from db_connection.db import get_db_connection
from typing import Optional

class User:
    def __init__(self, user_id: str, username: str, password: str, name: str):
        self.user_id = user_id
        self.username = username
        self.password = password  # This will store the hashed password
        self.name = name

    @staticmethod
    def hash_password(password: str) -> str:
        """Hash the password using bcrypt."""
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        return hashed.decode('utf-8')

    @classmethod
    def add_user(cls, user_id: str, username: str, password: str, name: str):
        """Add a new user to the database with a hashed password."""
        conn = get_db_connection()
        cursor = conn.cursor()
        hashed_password = cls.hash_password(password)

        try:
            cursor.execute(
                "INSERT INTO Users (id, username, password, name) VALUES (%s, %s, %s, %s)",
                (user_id, username, hashed_password, name)
            )
            conn.commit()
            return f"User {username} added successfully."
        except Exception as e:
            return f"Error adding user: {e}"
        finally:
            conn.close()

    @classmethod
    def delete_user(cls, user_id: str):
        """Delete a user from the database."""
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("DELETE FROM Users WHERE id = %s", (user_id,))
            conn.commit()
            return f"User with ID {user_id} deleted successfully."
        except Exception as e:
            return f"Error deleting user: {e}"
        finally:
            conn.close()

    @classmethod
    def update_user(cls, user_id: str, name: Optional[str] = None, password: Optional[str] = None):
        """Update user's name and/or password."""
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            if name:
                cursor.execute("UPDATE Users SET name = %s WHERE id = %s", (name, user_id))

            if password:
                hashed_password = cls.hash_password(password)
                cursor.execute("UPDATE Users SET password = %s WHERE id = %s", (hashed_password, user_id))

            conn.commit()
            return f"User with ID {user_id} updated successfully."
        except Exception as e:
            return f"Error updating user: {e}"
        finally:
            conn.close()
