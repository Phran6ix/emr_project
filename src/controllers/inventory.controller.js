const serverResponse = require('../utils/response');
const InventoryService = require('../services/Inventory.service');

module.exports = class InventoryController {
  async HttpAddToInventory(req, res, next) {
    try {
      const resp = await InventoryService.addToInventory(req.body);
      return serverResponse(res, 201, resp);
    } catch (error) {
      next(error);
    }
  }
  async HttpDeleteInventory(req, res, next) {
    try {
      const resp = await InventoryService.deleteInventory(req.params.id);
      return serverResponse(res, 200, 'deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async HttpEditInventory(req, res, next) {
    try {
      const resp = await InventoryService.editInventory(
        req.params.id,
        req.body
      );
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }
  async HttpGetInventory(req, res, next) {
    try {
      const resp = await InventoryService.getInventory(req.params.id);
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }
  async HttpGetAllInventory(req, res, next) {
    try {
      const resp = await InventoryService.getAllInventory(req.query);
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }
};
