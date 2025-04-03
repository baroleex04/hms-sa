from flask import Flask, jsonify, request
from modules.patient import Patient, MedicalHistory, get_db_connection

app = Flask(__name__)

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

# Start the Flask app
if __name__ == "__main__":
    app.run(debug=True)
