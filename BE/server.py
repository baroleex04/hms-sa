from flask import Flask, jsonify, request
from modules.patient import Patient, MedicalHistory, get_db_connection
from modules.staff import Staff, StaffRole, Ward
from modules.user import User
from flask_cors import CORS
import mysql.connector
import uuid, json
import bcrypt  # Import bcrypt for password verification

app = Flask(__name__)
# Enable CORS for all routes and all origins
CORS(app, resources={r"/*": {"origins": "*"}})

# Login endpoint
# http://127.0.0.1:5000/auth/login
# body
# {
#   "username": "admin@hospital.com",
#   "password": "admin123"
# }
@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Username and password are required"}), 400
    
    username = data["username"]
    password = data["password"]
    
    try:
        # Get user from database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, username, password, name FROM Users WHERE username = %s", (username,))
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            return jsonify({"error": "Invalid username or password"}), 401
        
        # Check password
        stored_hash = user["password"]
        if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
            # Password matches, return success
            return jsonify({
                "message": "Login successful",
                "user": {
                    "id": user["id"],
                    "username": user["username"],
                    "name": user["name"]
                }
            }), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get user by username
# http://127.0.0.1:5000/user?username=admin@hospital.com
@app.route("/user", methods=["GET"])
def get_user_by_username():
    username = request.args.get("username")
    if not username:
        return jsonify({"error": "username is required as a query parameter."}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, username, name FROM Users WHERE username = %s", (username,))
        user = cursor.fetchone()
        conn.close()

        if not user:
            return jsonify({"error": f"No user found with username: {username}"}), 404

        return jsonify(user), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Show all users
# http://127.0.0.1:5000/users
@app.route("/users", methods=["GET"])
def get_all_users():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, username, name FROM Users")
        users = cursor.fetchall()
        conn.close()

        if not users:
            return jsonify({"error": "No users found."}), 404

        return jsonify(users), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Add user
# http://127.0.0.1:5000/user/add
# body as password is hashed by backend
# {
#   "id": "U004",
#   "username": "nurse@hospital.com",
#   "password": "12345",
#   "name": "Nurse Daisy"
# }
@app.route("/user/add", methods=["POST"])
def add_user():
    data = request.get_json()
    required_fields = ["id", "username", "password", "name"]
    missing = [field for field in required_fields if field not in data]

    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
    
    hashed_password = User.hash_password(data["password"])

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO Users (id, username, password, name)
            VALUES (%s, %s, %s, %s)
        """, (
            data["id"],
            data["username"],
            hashed_password,  # Assumed to be hashed
            data["name"]
        ))
        conn.commit()
        conn.close()

        return jsonify({"message": "User added successfully!"}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500


# Delete user
# http://127.0.0.1:5000/user/delete?id=U004
@app.route("/user/delete", methods=["DELETE"])
def delete_user():
    user_id = request.args.get("id")
    if not user_id:
        return jsonify({"error": "id is required as a query parameter."}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Users WHERE id = %s", (user_id,))
        conn.commit()
        conn.close()

        if cursor.rowcount == 0:
            return jsonify({"error": "User not found."}), 404

        return jsonify({"message": "User deleted successfully!"}), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500


# Update user
# http://127.0.0.1:5000/user/update
# {
#   "id": "U004",
#   "username": "updated_nurse@hospital.com",
#   "password": "234",
#   "name": "Nurse Daisy Updated"
# }
@app.route("/user/update", methods=["PUT"])
def update_user():
    data = request.get_json()
    user_id = data.get("id")
    if not user_id:
        return jsonify({"error": "id is required."}), 400

    fields = []
    values = []
    data["password"] = User.hash_password(data["password"])

    for field in ["username", "password", "name"]:
        if field in data:
            fields.append(f"{field} = %s")
            values.append(data[field])

    if not fields:
        return jsonify({"error": "No fields to update."}), 400

    values.append(user_id)

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(f"""
            UPDATE Users SET {', '.join(fields)} WHERE id = %s
        """, tuple(values))
        conn.commit()
        conn.close()

        if cursor.rowcount == 0:
            return jsonify({"error": "User not found."}), 404

        return jsonify({"message": "User updated successfully!"}), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

# Example: http://127.0.0.1:5000/staff/add
# body
# {
#   "staff_id": "D003",
#   "name": "Dr. Alice Brown",
#   "contact_info": "08111111111",
#   "role": "Doctor",
#   "specialization": "Neurology",
#   "department": "Neurology",
#   "shift": [["Monday", "Day"], ["Thursday", "Night"]]
# }
@app.route("/staff/add", methods=["POST"])
def add_staff():
    """Add a new staff member."""
    data = request.get_json()

    required_fields = ["staff_id", "name", "contact_info", "role"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    try:
        staff_id = data["staff_id"]
        name = data["name"]
        contact_info = data["contact_info"]
        role = data["role"]
        specialization = data.get("specialization")
        department = data.get("department")
        ward = data.get("ward")
        shift = data.get("shift", [])

        # Validate role
        if role not in StaffRole._value2member_map_:
            return jsonify({"error": f"Invalid role '{role}'. Must be one of: {list(StaffRole._value2member_map_.keys())}"}), 400

        # Validate ward if provided
        if ward and ward not in Ward._value2member_map_:
            return jsonify({"error": f"Invalid ward '{ward}'. Must be one of: {list(Ward._value2member_map_.keys())}"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO Staff (
                staff_id, name, contact_info, role, specialization, department, ward, shift
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            staff_id, name, contact_info, role,
            specialization, department, ward,
            json.dumps(shift)
        ))

        conn.commit()
        conn.close()

        return jsonify({"message": "Staff member added successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
      
# Endpoint to get a specific staff member by staff_id
# Example: http://127.0.0.1:5000/staff?staff_id=S001
@app.route("/staff", methods=["GET"])
def get_staff_by_id():
    """Retrieve staff details by staff_id."""
    staff_id = request.args.get("staff_id")

    if not staff_id:
        return jsonify({"error": "staff_id is required as a query parameter."}), 400

    staff_data = Staff.get_staff_details(staff_id)

    if isinstance(staff_data, str) and "No staff member found" in staff_data:
        return jsonify({"error": staff_data}), 404

    return jsonify(staff_data), 200

# Endpoint to delete a specific staff member by staff_id
# Example: http://127.0.0.1:5000/staff/delete?staff_id=S001
@app.route("/staff/delete", methods=["DELETE"])
def delete_staff():
    """Delete a staff member by staff_id."""
    staff_id = request.args.get("staff_id")

    if not staff_id:
        return jsonify({"error": "staff_id is required."}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if staff exists
        cursor.execute("SELECT * FROM Staff WHERE staff_id = %s", (staff_id,))
        existing = cursor.fetchone()
        if not existing:
            return jsonify({"error": f"No staff found with ID: {staff_id}"}), 404

        # Delete staff
        cursor.execute("DELETE FROM Staff WHERE staff_id = %s", (staff_id,))
        conn.commit()
        conn.close()

        return jsonify({"message": f"Staff with ID {staff_id} deleted successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# http://127.0.0.1:5000/staff
@app.route("/staffs", methods=["GET"])
def get_all_staff():
    """Retrieve all staff members."""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Staff")
    staff_data = cursor.fetchall()
    conn.close()

    if not staff_data:
        return jsonify({"error": "No staff members found."}), 404

    staff_list = []
    for record in staff_data:
        staff = Staff(
            staff_id=record["staff_id"],
            name=record["name"],
            contact_info=record["contact_info"],
            role=StaffRole(record["role"]),
            specialization=record.get("specialization"),
            department=record.get("department"),
            ward=Ward(record["ward"]) if record.get("ward") else None,
            shift=record["shift"].split(",") if record.get("shift") else []
        )
        staff_list.append(staff.to_dict())

    return jsonify(staff_list), 200
  
# Endpoint to update staff info (name or contact_info)
# http://127.0.0.1:5000/staff/update_info
# Body:
# {
#   "staff_id": "S001",
#   "name": "Dr. John Smith",
#   "contact_info": "08000000000"
# }
@app.route("/staff/update_info", methods=["PUT"])
def update_staff_info():
    """Update staff member's name or contact information."""
    data = request.get_json()

    staff_id = data.get("staff_id")
    name = data.get("name")
    contact_info = data.get("contact_info")

    if not staff_id:
        return jsonify({"error": "staff_id is required."}), 400

    # Retrieve staff
    staff_data = Staff.get_staff_details(staff_id)

    if isinstance(staff_data, str) and "No staff member found" in staff_data:
        return jsonify({"error": staff_data}), 404

    # Create a Staff object from the returned dictionary
    staff = Staff(
        staff_id=staff_data["staff_id"],
        name=staff_data["name"],
        contact_info=staff_data["contact_info"],
        role=StaffRole(staff_data["role"]),
        specialization=staff_data.get("specialization"),
        department=staff_data.get("department"),
        ward=Ward(staff_data["ward"]) if staff_data.get("ward") else None,
        shift=staff_data["shift"]
    )

    # Perform update
    staff.update_info(name=name, contact_info=contact_info)

    return jsonify({"message": "Staff info updated successfully!"}), 200

# Endpoint to get a specific patient's details by patient_id or name
# http://127.0.0.1:5000/patient?patient_id=P001
@app.route("/patient", methods=["GET"])
def get_patient():
    """Retrieve patient details by patient_id or name."""
    patient_id = request.args.get("patient_id")
    name = request.args.get("name")

    if not patient_id and not name:
        return jsonify({"error": "Provide a search parameter (patient_id or name)."}), 400

    # Retrieve patient details using the class method
    patient = Patient.get_patient_details(patient_id=patient_id, name=name)

    if isinstance(patient, str) and "No patient found" in patient:
        return jsonify({"error": patient}), 404

    return jsonify(patient)

# http://127.0.0.1:5000/patients
# Endpoint to get all patients
@app.route("/patients", methods=["GET"])
def get_all_patients():
    """Retrieve all patients."""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Patient")  # Get all patients from the database
    patients_data = cursor.fetchall()

    if not patients_data:
        return jsonify({"error": "No patients found."}), 404

    # Get the medical history for each patient
    patients = []
    for patient_data in patients_data:
        cursor.execute("SELECT * FROM MedicalHistory WHERE patient_id = %s", (patient_data["patient_id"],))
        history_data = cursor.fetchone()

        # Create MedicalHistory object
        medical_history = MedicalHistory(
            history_id=history_data["history_id"],
            patient_id=history_data["patient_id"],
            condition=history_data["condition"],
            allergies=history_data["allergies"].split(",") if history_data else []
        ) if history_data else None

        # Create Patient object
        patient = Patient(
            patient_id=patient_data["patient_id"],
            name=patient_data["name"],
            date_of_birth=str(patient_data["date_of_birth"]),
            contact_info=patient_data["contact_info"],
            medical_history=medical_history
        )

        patients.append(patient.to_dict())

    conn.close()
    return jsonify(patients)

# Endpoint to update patient's general information (name or contact_info)
# http://127.0.0.1:5000/patient/update_info
# body 
# {
#   "patient_id": "P001",
#   "name": "John Doe Jr.",
#   "contact_info": "090909090909"
# }
@app.route("/patient/update_info", methods=["PUT"])
def update_patient_info():
    """Update patient info (name, contact_info)"""
    data = request.get_json()

    patient_id = data.get("patient_id")
    name = data.get("name")
    contact_info = data.get("contact_info")

    if not patient_id:
        return jsonify({"error": "patient_id is required."}), 400

    # Retrieve the patient
    patient = Patient.get_patient_details(patient_id=patient_id)

    if isinstance(patient, str) and "No patient found" in patient:
        return jsonify({"error": patient}), 404

    # Update patient info
    patient = Patient(patient_id=patient_id, name=patient["name"], contact_info=patient["contact_info"], date_of_birth=patient["date_of_birth"], medical_history=patient["medical_history"])

    patient.update_patient_info(name=name, contact_info=contact_info)

    return jsonify({"message": "Patient info updated successfully!"})

# http://127.0.0.1:5000/patient/update_condition
# body 
# {
#   "patient_id": "P001",
#   "condition": "Hypertension"
# }
# Endpoint to update medical history (condition)
@app.route('/patient/update_condition', methods=['PUT'])
def update_condition():
    patient_id = request.json.get('patient_id')
    new_condition = request.json.get('condition')

    # Retrieve patient details and medical history
    patient = Patient.get_patient_details(patient_id=patient_id)
    
    if isinstance(patient, str):
        return jsonify({"error": patient}), 400  # Return error message if no patient found
    
    if patient["medical_history"]:
        medical_history = patient["medical_history"]
        
        # Ensure medical_history is an instance of the MedicalHistory class
        if isinstance(medical_history, dict):
            medical_history = MedicalHistory(
                history_id=medical_history["history_id"],
                patient_id=medical_history["patient_id"],
                condition=medical_history["condition"],
                allergies=medical_history["allergies"].split(",") if isinstance(medical_history["allergies"], str) else medical_history["allergies"]
            )

        medical_history.update_condition(self=medical_history, new_condition=new_condition)  # Now this should work

        return jsonify({"message": "Condition updated successfully."}), 200
    else:
        return jsonify({"error": "No medical history found."}), 400

# http://127.0.0.1:5000/patient/update_allergies
# body
# {
#     "patient_id": "P001",
#     "new_allergies": ["Peanuts", "Shellfish"]
# }
@app.route("/patient/update_allergies", methods=["PUT"])
def update_allergies():
    patient_id = request.json.get("patient_id")
    new_allergies = request.json.get("new_allergies")

    # Retrieve patient by patient_id from the database
    patient = Patient.get_patient_details(patient_id=patient_id)  # Fetch patient details

    if isinstance(patient, str) and "No patient found" in patient:
        return jsonify({"error": patient}), 404  # Patient not found

    # Retrieve medical history
    medical_history = patient.get("medical_history")

    if medical_history:
        # Ensure medical_history is an instance of the MedicalHistory class
        if isinstance(medical_history, dict):
            medical_history = MedicalHistory(
                history_id=medical_history["history_id"],
                patient_id=medical_history["patient_id"],
                condition=medical_history["condition"],
                allergies=medical_history["allergies"] if isinstance(medical_history["allergies"], list) else medical_history["allergies"].split(",")
            )

        # Update the allergies using the method from MedicalHistory
        medical_history.update_allergies(self=medical_history, new_allergies=new_allergies)  # Call the method on the MedicalHistory instance

        return jsonify({"message": "Allergies updated successfully!"}), 200
    else:
        return jsonify({"error": "No medical history found."}), 400

# http://127.0.0.1:5000/patient/add
# body
# {
#     "patient_id": "P005",
# "name": "Jane Doe",
# "date_of_birth": "1990-05-15",
# "contact_info": "09123456789",
# "condition": "Asthma",
# "allergies": ["Peanuts", "Dust"]
# }
@app.route("/patient/add", methods=["POST"])
def add_patient():
    """Add a new patient and medical history."""
    data = request.get_json()

    patient_id = data.get("patient_id")
    condition = data.get("condition")
    allergies = data.get("allergies")

    if not patient_id or not condition or not allergies:
        return jsonify({"error": "patient_id, condition, and allergies are required."}), 400

    # Generate a unique history_id using UUID
    history_id = str(uuid.uuid4())  # UUID as a string

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert patient information
        cursor.execute("INSERT INTO Patient (patient_id, name, date_of_birth, contact_info) VALUES (%s, %s, %s, %s)",
                       (patient_id, data["name"], data["date_of_birth"], data["contact_info"]))
        
        # Insert medical history information with the generated history_id
        cursor.execute("INSERT INTO MedicalHistory (history_id, patient_id, `condition`, allergies) VALUES (%s, %s, %s, %s)",
                       (history_id, patient_id, condition, ",".join(allergies)))  # Join allergies list into a string

        conn.commit()
        conn.close()

        return jsonify({"message": "Patient and medical history added successfully!"}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

# http://127.0.0.1:5000/patient/delete
# params: "patent_id"
@app.route("/patient/delete", methods=["DELETE"])
def delete_patient():
    """Delete a patient and their medical history from the database."""
    patient_id = request.args.get("patient_id")

    # Validate patient_id
    if not patient_id:
        return jsonify({"error": "patient_id is required."}), 400

    # Delete from MedicalHistory first (to avoid foreign key constraint issues)
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM MedicalHistory WHERE patient_id = %s", (patient_id,))
        conn.commit()

        # Then delete from Patient table
        cursor.execute("DELETE FROM Patient WHERE patient_id = %s", (patient_id,))
        conn.commit()

        return jsonify({"message": "Patient and medical history deleted successfully!"}), 200
    except mysql.connector.Error as err:
        conn.rollback()  # Rollback if an error occurs
        return jsonify({"error": str(err)}), 500
    finally:
        conn.close()


# Start the Flask app
if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
