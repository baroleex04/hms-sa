import mysql.connector
from typing import List, Optional

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host="127.0.0.1",
        port=3308,# Change to your DB host if needed
        user="root",          # Your MySQL username
        password="root",  # Your MySQL password
        database="hospital_db"
    )

# MedicalHistory Class
class MedicalHistory:
    def __init__(self, history_id: str, patient_id: str, condition: str, allergies: List[str]):
        self.history_id = history_id
        self.patient_id = patient_id
        self.condition = condition
        self.allergies = allergies

    @staticmethod
    def update_condition(self, new_condition: str):
        """Update medical condition in the database."""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE MedicalHistory SET `condition` = %s WHERE history_id = %s", (new_condition, self.history_id))
        conn.commit()
        conn.close()
        self.condition = new_condition


    @staticmethod
    def update_allergies(self, new_allergies: List[str]):
        """Update allergies in the database."""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE MedicalHistory SET `allergies` = %s WHERE history_id = %s", (",".join(new_allergies), self.history_id))
        conn.commit()
        conn.close()
        self.allergies = new_allergies


# Patient Class
class Patient:
    def __init__(self, patient_id: str, name: str, date_of_birth: str, contact_info: str, medical_history: Optional[MedicalHistory] = None):
        self.patient_id = patient_id
        self.name = name
        self.date_of_birth = date_of_birth
        self.contact_info = contact_info
        self.medical_history = medical_history

    @staticmethod
    @staticmethod
    def get_patient_details(patient_id: Optional[str] = None, name: Optional[str] = None):
        """Retrieve patient details from MySQL."""
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        if patient_id:
            cursor.execute("SELECT * FROM Patient WHERE patient_id = %s", (patient_id,))
        elif name:
            cursor.execute("SELECT * FROM Patient WHERE name = %s", (name,))
        else:
            return "Provide a search parameter (patient_id or name)."

        patient_data = cursor.fetchone()
        if not patient_data:
            return "No patient found."

        # Get medical history
        cursor.execute("SELECT * FROM MedicalHistory WHERE patient_id = %s", (patient_data["patient_id"],))
        history_data = cursor.fetchone()
        conn.close()

        if not history_data:
            return {"patient_id": patient_data["patient_id"], "message": "No medical history found."}

        # Create MedicalHistory object
        medical_history = MedicalHistory(
            history_id=history_data["history_id"],
            patient_id=history_data["patient_id"],
            condition=history_data["condition"],
            allergies=history_data["allergies"].split(",") if history_data["allergies"] else []
        )

        # Create Patient object
        patient = Patient(
            patient_id=patient_data["patient_id"],
            name=patient_data["name"],
            date_of_birth=str(patient_data["date_of_birth"]),
            contact_info=patient_data["contact_info"],
            medical_history=medical_history  # Ensure medical_history is an instance of MedicalHistory
        )

        return patient.to_dict()

    def update_patient_info(self, name: Optional[str] = None, contact_info: Optional[str] = None):
        """Update patient info in MySQL."""
        conn = get_db_connection()
        cursor = conn.cursor()

        if name:
            cursor.execute("UPDATE Patient SET name = %s WHERE patient_id = %s", (name, self.patient_id))
            self.name = name

        if contact_info:
            cursor.execute("UPDATE Patient SET contact_info = %s WHERE patient_id = %s", (contact_info, self.patient_id))
            self.contact_info = contact_info

        conn.commit()
        conn.close()

    def to_dict(self):
        """Convert patient data to a dictionary."""
        return {
            "patient_id": self.patient_id,
            "name": self.name,
            "date_of_birth": self.date_of_birth,
            "contact_info": self.contact_info,
            "medical_history": self.medical_history.__dict__ if self.medical_history else None
        }

# Example Usage
if __name__ == "__main__":
    # Retrieve patient details from MySQL
    print(Patient.get_patient_details(patient_id="P001"))
