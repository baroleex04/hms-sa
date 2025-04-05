-- Create the database (if not already created)
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

-- Create the Patient table
CREATE TABLE IF NOT EXISTS Patient (
    patient_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    contact_info VARCHAR(100) NOT NULL
);

-- Create the MedicalHistory table
CREATE TABLE IF NOT EXISTS MedicalHistory (
    history_id VARCHAR(50) PRIMARY KEY,
    patient_id VARCHAR(50) NOT NULL,
    `condition` TEXT NOT NULL,  -- Fixed by using backticks
    allergies TEXT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) ON DELETE CASCADE
);

-- Create the Staff table
CREATE TABLE IF NOT EXISTS Staff (
    staff_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(100) NOT NULL,
    role ENUM('Doctor', 'Nurse') NOT NULL,
    specialization VARCHAR(100),  -- Only for doctors
    department VARCHAR(100),      -- Only for doctors
    ward ENUM('General', 'ICU', 'Pediatric', 'Emergency'),  -- Only for nurses
    shift JSON                     -- Comma-separated shift list
);

CREATE TABLE IF NOT EXISTS Users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(255)
);

-- Insert sample data into Patient table
INSERT INTO Patient (patient_id, name, date_of_birth, contact_info)
VALUES 
    ('P001', 'John Doe', '1990-05-15', '1234567890'),
    ('P002', 'Jane Smith', '1985-08-25', '0987654321');

-- Insert sample data into MedicalHistory table
INSERT INTO MedicalHistory (history_id, patient_id, `condition`, allergies)
VALUES 
    ('H001', 'P001', 'Diabetes', 'Peanuts,Dust'),
    ('H002', 'P002', 'Asthma', 'Pollen,Smoke');

-- Insert sample data into Staff table
INSERT INTO Staff (staff_id, name, contact_info, role, specialization, department, ward, shift)
VALUES 
    ('D001', 'Dr. John Doe', 'john.doe@hospital.com', 'Doctor', 'Cardiology', 'Cardiology', NULL, 
     '[["Monday", "Day"], ["Wednesday", "Night"], ["Friday", "Day"]]'),
    ('N001', 'Nurse Jane Smith', 'jane.smith@hospital.com', 'Nurse', NULL, NULL, 'ICU', 
     '[["Tuesday", "Night"], ["Thursday", "Day"], ["Saturday", "Night"]]');

-- Sample Users (passwords are plaintext examples for readability)
INSERT INTO Users (id, username, password, name)
VALUES 
    ('U001', 'admin@hospital.com', '$2b$12$Wv3kRQaB9fIjc9Nckl9eXOSkDdYuBf3cKoC38umEpFMUHvZB9QW2y', 'Admin User'),
    ('U002', 'reception@hospital.com', '$2b$12$dJHJoQnrZGBNtwBTSqxz8euTiGAX6aYwN.qzLplCUoW9cvkT7EWEq', 'Receptionist'),
    ('U003', 'doctor1@hospital.com', '$2b$12$olB3cKixRnXZpsWq1OCN0eGVwd4vmpxxYoZAH5qDBgL7QqtPMWpL2', 'Dr. A. Patel');

