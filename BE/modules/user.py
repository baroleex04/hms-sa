import bcrypt
from db_connection.db import get_db_connection
from typing import Optional
from werkzeug.security import generate_password_hash, check_password_hash

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
    def login(cls, username: str, password: str) -> Optional["User"]:
        """
        Authenticate a user by username and password.

        Returns:
            User object if authentication is successful, otherwise None.
        """
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("SELECT id, username, password, name FROM Users WHERE username = %s", (username,))
            user_data = cursor.fetchone()

            if user_data:
                user_id, db_username, db_password, name = user_data
                if bcrypt.checkpw(password.encode('utf-8'), db_password.encode('utf-8')):
                    return cls(user_id=user_id, username=db_username, password=db_password, name=name)

            return None  # Login failed
        except Exception as e:
            print(f"Login error: {e}")
            return None
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
