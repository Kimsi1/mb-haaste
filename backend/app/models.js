/**
 * Simple ORM using a regular JSON file as a "database".
 * 
 * ORM stands for "Object-Relational Mapping." 
 * It is a technique that allows data to be manipulated and queried using an object-oriented paradigm.
 * 
 * ORM provides methods to perform CRUD (Create, Read, Update, Delete) operations on your database
 * using the programming language's syntax
 */

import { JsonDB, Config } from 'node-json-db'

// Create a new instance of JsonDB for database operations
const db = new JsonDB(new Config('database', true, true, '.'))

// Function to generate a unique ID based on the current timestamp
const getId = () => `id-${+(new Date()).getTime()}`

// Function to create a basic model with CRUD operations
const createModel = key => ({
  // Get all items from the specified key
  getAll: async () => {
    const items = await db.getObjectDefault(`.${key}`, {})
    return Object.values(items).map(item => ({ ...item, id: item.id }));
  },
  // Get a specific item by ID from the specified key
  get: async (id) => {
    try {
      return await db.getObject(`.${key}.${id}`);
    } catch (error) {
      console.error(`Error getting item ${id} from ${key}:`, error);
      throw error;
    }
  },
  // Add a new item to the specified key
  add: async (data) => {
    const id = getId()
    const newItem = { ...data, id }
    await db.push(`.${key}`, { [id]: newItem }, false)
    return newItem
  },
  // Update an existing item in the specified key
  update: async (id, data) => {
    try {
      await db.push(`.${key}`, { [id]: data }, false);
      return data;
    } catch (error) {
      console.error(`Error updating item ${id} in ${key}:`, error);
      throw error;
    }
  },
  // Delete an item by ID from the specified key
  delete: async (id) => {
    try {
      const deletedItem = await db.getObject(`.${key}.${id}`);
      await db.delete(`.${key}.${id}`);
      return deletedItem;
    } catch (error) {
      console.error(`Error deleting item from ${key}:`, error);
      throw error;
    }
  },
})

// Function to create a model for a one-to-many relationship
const createOneToManyModel = (key, modifier) => ({
  // Get all items related to a parent item
  getAll: async (parentId) => {
    try {
      const items = await db.getObjectDefault(`.${key}.${parentId}`, []);
      return items.map(modifier);
    } catch (error) {
      console.error(`Error getting all items for parent ${parentId} from ${key}:`, error);
      throw error;
    }
  },
  // Add a new item related to a parent item
  add: async (parentId, subId) => {
    try {
      const newItem = { parentId, subId };
      await db.push(`.${key}.${parentId}[]`, newItem);
      return modifier(newItem);
    } catch (error) {
      console.error(`Error adding item to ${key} for parent ${parentId}:`, error);
      throw error;
    }
  },
  // Delete a specific item related to a parent item
  delete: async (parentId, subId) => {
    try {
      const items = await db.getObjectDefault(`.${key}.${parentId}`, []);
      const deletedItem = items.find(item => item.subId === subId);
      const filtered = items.filter(item => item.subId !== subId);
      await db.push(`.${key}.${parentId}`, filtered, true);
      return deletedItem;
    } catch (error) {
      console.error(`Error deleting item ${subId} from ${key} for parent ${parentId}:`, error);
      throw error;
    }
  },
  // Delete all items related to a parent item
  deleteAll: async (parentId) => {
    try {
      const items = await db.getObject(`.${key}.${parentId}`);
      await db.delete(`.${key}.${parentId}`);
      return items || [];
    } catch (error) {
      console.error(`Error deleting all items from ${key}:`, error);
      throw error;
    }
  },
})

// Exporting models for 'customers', 'contacts', and 'customerContacts'
export const Customers = createModel('customers')
export const Contacts = createModel('contacts')
export const CustomerContacts = createOneToManyModel('customerContacts', ({ parentId, subId }) => ({ customerId: parentId, contactId: subId }))