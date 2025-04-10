-- Create the database (if not already created)
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

-- Create the Patient table
CREATE TABLE IF NOT EXISTS Patient (
    patient_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other'),
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
    specialization VARCHAR(100),
    department VARCHAR(100),
    ward VARCHAR(100),
    status ENUM('active', 'inactive') NOT NULL,
    shift JSON                     -- Comma-separated shift list
);

CREATE TABLE IF NOT EXISTS Users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(255)
);

-- Insert sample data into Patient table
INSERT INTO Patient (patient_id, name, gender, date_of_birth, contact_info)
VALUES 
    ('P001', 'John Doe', 'Female', '1990-05-15', '1234567890'),
    ('P002', 'Jane Smith', 'Male', '1985-08-25', '0987654321'),
    ('P003', 'Emily Johnson', 'Female', '1992-03-10', '5551234567'),
    ('P004', 'Michael Brown', 'Male', '1988-11-12', '4449876543'),
    ('P005', 'Sarah Davis', 'Female', '1995-07-22', '7771112222'),
    ('P006', 'David Wilson', 'Male', '1983-01-30', '6663334444'),
    ('P007', 'Laura Martinez', 'Female', '1979-09-18', '8889990000'),
    ('P008', 'James Taylor', 'Male', '2000-04-05', '9998887777'),
    ('P009', 'Olivia Thomas', 'Female', '1998-06-14', '2225556666'),
    ('P010', 'Daniel White', 'Male', '1991-12-01', '1114447777');

-- Insert sample data into MedicalHistory table
INSERT INTO MedicalHistory (history_id, patient_id, `condition`, allergies)
VALUES 
    ('H001', 'P001', 'Diabetes', 'Peanuts,Dust'),
    ('H002', 'P002', 'Asthma', 'Pollen,Smoke'),
    ('H003', 'P003', 'Hypertension', 'None'),
    ('H004', 'P004', 'Heart Disease', 'Penicillin'),
    ('H005', 'P005', 'Migraines', 'Chocolate'),
    ('H006', 'P006', 'Arthritis', 'None'),
    ('H007', 'P007', 'Allergy', 'Shellfish'),
    ('H008', 'P008', 'Depression', 'None'),
    ('H009', 'P009', 'Anemia', 'Gluten'),
    ('H010', 'P010', 'Chronic Pain', 'Latex');

-- Insert sample data into Staff table
-- Insert Doctors
INSERT INTO Staff (staff_id, name, contact_info, role, status, specialization, department, ward, shift) VALUES
('D002', 'Dr. Alice Nguyen', 'alice.nguyen@hospital.com', 'Doctor', 'active', 'Neurology', 'Neurology', 'ICU', 
 '[["Tuesday", "Day"], ["Thursday", "Night"]]'),
('D003', 'Dr. Michael Smith', 'michael.smith@hospital.com', 'Doctor', 'active', 'Pediatrics', 'Pediatrics', 'Pediatric', 
 '[["Monday", "Night"], ["Wednesday", "Day"]]'),
('D004', 'Dr. Linda Park', 'linda.park@hospital.com', 'Doctor', 'inactive', 'Orthopedics', 'Orthopedics', 'General', 
 '[["Friday", "Day"], ["Saturday", "Night"]]'),
('D005', 'Dr. David Chen', 'david.chen@hospital.com', 'Doctor', 'active', 'Dermatology', 'Dermatology', 'General', 
 '[["Monday", "Day"], ["Thursday", "Day"]]'),
('D006', 'Dr. Sophia Lee', 'sophia.lee@hospital.com', 'Doctor', 'active', 'Oncology', 'Oncology', 'Emergency', 
 '[["Tuesday", "Night"], ["Friday", "Day"]]');


-- Insert Nurses
INSERT INTO Staff (staff_id, name, contact_info, role, status, specialization, department, ward, shift) VALUES
('N001', 'Nurse Emily Tran', 'emily.tran@hospital.com', 'Nurse', 'active', 'General', 'Emergency', 'Emergency', 
 '[["Monday", "Day"], ["Wednesday", "Day"]]'),
('N002', 'Nurse James Wong', 'james.wong@hospital.com', 'Nurse', 'active', 'ICU', 'ICU', 'ICU', 
 '[["Tuesday", "Night"], ["Thursday", "Night"]]'),
('N003', 'Nurse Grace Kim', 'grace.kim@hospital.com', 'Nurse', 'inactive', 'Surgery', 'Surgery', 'General', 
 '[["Monday", "Night"], ["Friday", "Day"]]'),
('N004', 'Nurse Robert Liu', 'robert.liu@hospital.com', 'Nurse', 'active', 'Recovery', 'Post-Op', 'Pediatric', 
 '[["Wednesday", "Day"], ["Saturday", "Night"]]'),
('N005', 'Nurse Olivia Patel', 'olivia.patel@hospital.com', 'Nurse', 'active', 'Maternity', 'Obstetrics', 'Emergency', 
 '[["Thursday", "Day"], ["Sunday", "Night"]]');


-- Sample Users (passwords are plaintext examples for readability)
INSERT INTO Users (id, username, password, name)
VALUES 
    ('U001', 'admin@hospital.com', '$2b$12$Wv3kRQaB9fIjc9Nckl9eXOSkDdYuBf3cKoC38umEpFMUHvZB9QW2y', 'Admin User'),
    ('U002', 'reception@hospital.com', '$2b$12$dJHJoQnrZGBNtwBTSqxz8euTiGAX6aYwN.qzLplCUoW9cvkT7EWEq', 'Receptionist'),
    ('U003', 'doctor1@hospital.com', '$2b$12$olB3cKixRnXZpsWq1OCN0eGVwd4vmpxxYoZAH5qDBgL7QqtPMWpL2', 'Dr. A. Patel');

