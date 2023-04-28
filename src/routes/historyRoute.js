const historyRouter = require('express').Router();
const HistoryController = require('../controllers/historyController');

const { HTTPGetPatientHistory, HTTPGetHistoryWithPID } =
  new HistoryController();

historyRouter.get('/', HTTPGetPatientHistory);
historyRouter.get('/pid', HTTPGetHistoryWithPID);

module.exports = historyRouter;
