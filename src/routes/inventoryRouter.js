const InventoryRouter = require('express').Router();
const InventoryController = require('../controllers/inventory.controller');
const {
  HttpAddToInventory,
  HttpDeleteInventory,
  HttpEditInventory,
  HttpGetAllInventory,
  HttpGetInventory,
} = new InventoryController();

InventoryRouter.route('/').post(HttpAddToInventory).get(HttpGetAllInventory);

InventoryRouter.route('/:id')
  .get(HttpGetInventory)
  .delete(HttpDeleteInventory)
  .patch(HttpEditInventory);

module.exports = InventoryRouter;
