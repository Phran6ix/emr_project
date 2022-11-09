const PatientService = require('../services/patient.service');
const serverResponse = require('../utils/response');

module.exports = class PatientController {
  async HttpRegisterPatient(req, res, next) {
    try {
      const resp = await PatientService.createPatient(req.body);
      return serverResponse(res, 201, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpUpdatePatient(req, res, next) {
    try {
      const resp = await PatientService.updatePatient(req.params.id, req.body);
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpGetAllPatients(req, res, next) {
    try {
      const resp = await PatientService.getAllPatients();
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpDeletePatient(req, res, next) {
    try {
      await PatientService.deletePatient(req.params.id);
      return serverResponse(res, 200, 'doc deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async HttpAddPatientBioData(req, res, next) {
    try {
      //
    } catch (error) {
      next(error);
    }
  }

  async HttpGetOnePatient(req, res, next) {
    try {
      const resp = await PatientService.getOnePatient(req.params.id);
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpGetAllBioData(req, res, next) {
    try {
      const resp = await PatientService.getAllBioData();
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpGetOneBioData(req, res, next) {
    try {
      const resp = await PatientService.getOnePatientBio(req.params.id);
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpUpdateBioData(req, res, next) {
    try {
      const resp = await PatientService.updatePatientBio(
        req.params.id,
        req.body
      );
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }
};
