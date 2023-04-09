const Prescription = require('../database/models/prescription.model');
const Diagnosis = require('../database/models/diagnosis.model');
const Inventory = require('../database/models/inventory.model');
const Session = require('../database/models/patient-session.model');

const X = require('../exceptions/operational.exception');

module.exports = class PrescriptionService {
  static async addPrescription(payload) {
    try {
      const inventory = await Inventory.findById(payload.drugId);

      if (inventory.quantity < payload.quantity) {
        throw new X('Out of stock', 400);
      }

      inventory.quantity = inventory.quantity - payload.quantity;

      const doc = await Prescription.create(payload);
      await inventory.save();
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async updatePrescription(patientId, payload) {
    try {
      const doc = await Prescription.findByIdAndUpdate(patientId, payload);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async deletePrescription(patientId) {
    try {
      const doc = await Prescription.findByIdAndDelete(patientId);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getPrescription(patientId) {
    try {
      const doc = await Prescription.findOne({ patient: patientId });
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getDiagnosis(diagnosis_id) {
    try {
      const doc = await Diagnosis.findById(diagnosis_id)
        .populate({
          path: 'diagnosis',
          select: 'title',
        })
        .populate({
          path: 'patient',
          select: 'name dob PID',
        })
        .populate({
          path: 'doctor',
          select: 'username role fullName online status',
        });

      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async updateDiagnosis(diagnosis_id, payload) {
    try {
      const doc = await Diagnosis.findByIdAndUpdate(diagnosis_id, payload);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getAllDiagnosis() {
    try {
      const doc = await Diagnosis.find()
        .populate({
          path: 'diagnosis',
          select: 'title',
        })
        .populate({
          path: 'patient',
          select: 'name dob PID',
        })
        .populate({
          path: 'doctor',
          select: 'username role fullName online status',
        });

      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async deleteDiagnosis(diagnosis_id) {
    try {
      const doc = await Diagnosis.findByIdAndDelete(diagnosis_id);
      if (!doc) throw new X('no doc found with the provided id ', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }
  static async createDiagnosis(payload) {
    try {
      const doc = await Diagnosis.create(payload);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getSessionPrescriptions(session_id) {
    try {
      const session = await Session.findById(session_id)
        .populate({
          path: 'patient',
          select: 'name dob PID',
        })
        .select('status createdAt patient');

      const docs = await Prescription.find({
        sessionID: session_id,
      })
        .populate({
          path: 'drugId',
          select: 'name price quantity type',
        })
        .populate({
          path: 'doctor',
          select: 'fullName role ',
        })
        .select('-__v');

      if (!docs || !session) {
        throw new X('Document not found', 404);
      }

      return {
        session,
        prescription: docs,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getDiagnosisSession(session_id) {
    try {
      const session = await Session.findById(session_id)
        .populate({
          path: 'patient',
          select: 'name dob PID',
        })
        .select('status createdAt patient');

      const docs = await Diagnosis.find({
        sessionID: session_id,
      })
        .populate({
          path: 'diagnosis',
          select: 'title',
        })
        .select('-__v -patient -doctor');

      if (!docs || !session) {
        throw new X('Document not found', 404);
      }
      return {
        session,
        diagnosis: docs,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getPaidPrescription() {
    try {
      const prescription = await Prescription.find({
        paid: true,
        dispersed: false,
      })
        .populate({
          path: 'drugId',
          select: 'name',
        })
        .populate({
          path: 'patient',
          select: 'name',
        })
        .populate({
          path: 'doctor',
          select: 'fullName',
        });

      const patient = prescription.map((document) => {
        return { ...document.patient._doc };
      });

      const filterPatient = patient.filter((item, index) => {
        return (
          index ===
          patient.findIndex((obj) => {
            return JSON.stringify(obj) === JSON.stringify(item);
          })
        );
      });

      return filterPatient;
    } catch (error) {
      throw error;
    }
  }

  static async getPaidPatientPrescription(patient_id) {
    try {
      const prescription = await Prescription.find({
        paid: true,
        dispersed: false,
        patient: patient_id,
      }).populate({
        path: 'drugId',
        select: 'name price type',
      });

      return prescription;
    } catch (error) {
      throw error;
    }
  }

  static async dispersePrescription(prescription_id) {
    try {
      const prescription = await Prescription.findById(prescription_id);
      if (prescription.paid == false)
        throw new X(
          'Prescription has not been approved, reach out to cashier',
          400
        );

      prescription.dispersed = true;
      await prescription.save();
      return prescription;
    } catch (error) {
      throw error;
    }
  }
};
