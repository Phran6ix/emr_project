const InventoryRouter = require('express').Router();
const AuthService = require('../services/auth.service');
const InventoryController = require('../controllers/inventory.controller');
const {
  HttpAddToInventory,
  HttpDeleteInventory,
  HttpEditInventory,
  HttpGetAllInventory,
  HttpGetInventory,
} = new InventoryController();

InventoryRouter.use(AuthService.protectRoute);

InventoryRouter.route('/').post(HttpAddToInventory).get(HttpGetAllInventory);

InventoryRouter.route('/:id')
  .get(HttpGetInventory)
  .delete(HttpDeleteInventory)
  .patch(HttpEditInventory);

module.exports = InventoryRouter;
