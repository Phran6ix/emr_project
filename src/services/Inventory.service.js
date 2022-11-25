const X = require('../exceptions/operational.exception');
const Inventory = require('../database/models/inventory.model');

module.exports = class InventoryService {
  static async addToInventory(payload) {
    try {
      const doc = await Inventory.create(payload);
      return doc;
    } catch (error) {
      throw error;
    }
  }
  static async deleteInventory(inventory_id) {
    try {
      const doc = await Inventory.findByIdAndDelete(inventory_id);
      if (!doc) return new X('no document found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async editInventory(inventory_id, payload) {
    try {
      const doc = await Inventory.findByIdAndUpdate(inventory_id, payload);
      if (!doc) return new X('no document found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }
  static async getInventory(inventory_id) {
    try {
      const doc = await Inventory.findById(inventory_id);
      if (!doc) return new X('no document found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getAllInventory(query) {
    try {
      const limit = +query.limit || 0;
      const skip = (+query.page - 1) * limit;
      let docs = await Inventory.find().skip(skip).limit(limit);
      return docs;
    } catch (error) {
      throw error;
    }
  }
};
