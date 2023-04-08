const historyRouter = require('express').Router();
const HistoryController = require('../controllers/historyController');

const { HTTPGetPatientHistory } = new HistoryController();

historyRouter.get('/', HTTPGetPatientHistory);

module.exports = historyRouter;
