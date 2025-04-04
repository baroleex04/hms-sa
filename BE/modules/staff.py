from abc import ABC
from enum import Enum

class ShiftType(Enum):
  MORNING = 0

class Staff(ABC):
  def update_contact_info(self, info):
    pass

  def get_availability(self):
    pass

class Doctor(Staff):
  def __init__(self, specialization):
    self.specialization = specialization

  def prescribe_medication(self):
    pass

  def diagnose_patient(self):
    pass

class Nurse(Staff):
  pass

class StaffManagement():
  def __init__(self, dbconn):
    self.dbconn = dbconn

  def mock(self):
    return "Staff!"
