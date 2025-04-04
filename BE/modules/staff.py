import mysql.connector
import json
from enum import Enum
from typing import List, Optional, Tuple
from db_connection.db import get_db_connection  # Assuming you have a db connection module

# Enums for Staff Role & Ward
class StaffRole(Enum):
    DOCTOR = "Doctor"
    NURSE = "Nurse"

class Ward(Enum):
    GENERAL = "General"
    ICU = "ICU"
    PEDIATRIC = "Pediatric"
    EMERGENCY = "Emergency"

# Staff Class (Combining Doctor & Nurse)
class Staff:
    def __init__(
        self,
        staff_id: str,
        name: str,
        contact_info: str,
        role: StaffRole,
        specialization: Optional[str] = None,
        department: Optional[str] = None,
        ward: Optional[Ward] = None,
        shift: Optional[List[Tuple[str, str]]] = None,  # List of tuples [(day, shift_type)]
    ):
        self.staff_id = staff_id
        self.name = name
        self.contact_info = contact_info
        self.role = role
        self.specialization = specialization  # Only for Doctors
        self.department = department  # Only for Doctors
        self.ward = ward  # Only for Nurses
        self.shift = shift or []  # List of shifts (day, shift_type)

    def update_info(self, name: Optional[str] = None, contact_info: Optional[str] = None):
        """Update staff details in the database."""
        conn = get_db_connection()
        cursor = conn.cursor()

        if name:
            cursor.execute("UPDATE Staff SET name = %s WHERE staff_id = %s", (name, self.staff_id))
            self.name = name

        if contact_info:
            cursor.execute("UPDATE Staff SET contact_info = %s WHERE staff_id = %s", (contact_info, self.staff_id))
            self.contact_info = contact_info

        conn.commit()
        conn.close()

    def update_shift(self, new_shift: List[Tuple[str, str]]):
        """Update the staff's shift schedule in the database."""
        conn = get_db_connection()
        cursor = conn.cursor()

        # Convert list of tuples to JSON format
        shift_json = json.dumps(new_shift)

        cursor.execute("UPDATE Staff SET shift = %s WHERE staff_id = %s", (shift_json, self.staff_id))
        conn.commit()
        conn.close()

        self.shift = new_shift  # Update local object

    @staticmethod
    def get_availability(staff_id: str) -> List[Tuple[str, str]]:
        """Retrieve the available shifts of a staff member from the database."""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT shift FROM Staff WHERE staff_id = %s", (staff_id,))
        shifts = cursor.fetchone()
        conn.close()

        if not shifts or not shifts[0]:
            return []

        return json.loads(shifts[0])  # Convert JSON back to list of tuples

    @staticmethod
    def get_staff_details(staff_id: str):
        """Retrieve staff details from MySQL."""
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Staff WHERE staff_id = %s", (staff_id,))
        staff_data = cursor.fetchone()
        conn.close()

        if not staff_data:
            return "No staff member found."

        # Convert role & ward from string to Enum
        role = StaffRole(staff_data["role"])
        ward = Ward(staff_data["ward"]) if staff_data["ward"] else None

        # Deserialize shift JSON string into list of tuples
        shift = json.loads(staff_data["shift"]) if staff_data["shift"] else []

        # Create a Staff object
        staff = Staff(
            staff_id=staff_data["staff_id"],
            name=staff_data["name"],
            contact_info=staff_data["contact_info"],
            role=role,
            specialization=staff_data.get("specialization"),
            department=staff_data.get("department"),
            ward=ward,
            shift=shift,
        )
        return staff.to_dict()


    def to_dict(self):
        """Convert staff data to a dictionary."""
        return {
            "staff_id": self.staff_id,
            "name": self.name,
            "contact_info": self.contact_info,
            "role": self.role.value,
            "specialization": self.specialization,
            "department": self.department,
            "ward": self.ward.value if self.ward else None,
            "shift": self.shift,  # List of (day, shift_type) tuples
        }
