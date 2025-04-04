from modules.staff import Staff, StaffRole, Ward

# Create a new doctor staff member
doctor = Staff(
    staff_id="D001",
    name="Dr. John Doe",
    contact_info="john.doe@hospital.com",
    role=StaffRole.DOCTOR,
    specialization="Cardiology",
    department="Cardiology",
    shift=["Morning", "Evening"]
)

# Create a new nurse staff member
nurse = Staff(
    staff_id="N001",
    name="Nurse Jane Smith",
    contact_info="jane.smith@hospital.com",
    role=StaffRole.NURSE,
    ward=Ward.ICU,
    shift=["Night"]
)

# Display the staff details as a dictionary
print("\n--- Doctor Details ---")
print(doctor.to_dict())

print("\n--- Nurse Details ---")
print(nurse.to_dict())

# Simulating database interactions
print("\n--- Fetching Staff Details from Database ---")
staff_details = Staff.get_staff_details("D001")
print(staff_details)

# Update contact info
print("\n--- Updating Doctor's Contact Info ---")
doctor.update_info(contact_info="new.email@hospital.com")
print("Updated Contact Info:", doctor.contact_info)

# Get availability (shifts)
print("\n--- Fetching Availability for Doctor ---")
availability = Staff.get_availability("D001")
print("Doctor's Available Shifts:", availability)
