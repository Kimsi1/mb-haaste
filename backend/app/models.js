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
const db = new JsonDB(new Config('../database/database', true, true, '.'))

// Function to generate a unique ID based on the current timestamp
const getId = () => `id-${+(new Date()).getTime()}`

// Function to create a basic model with CRUD operations
const createModel = key => ({
  // Get all items from the specified key
  getAll: async () => {
    const items = await db.getObjectDefault(`.${key}`, {})
    const answer = Object.values(items).map(item => ({ ...item, id: item.id }));
    //console.log(answer)
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
const createOneToManyModel = key => ({
  // Get all items related to a parent item
  getAll: async (customerId) => {
    try {
      console.log(customerId)
      const items = await db.getObjectDefault(`.customerContacts.customerIds.${customerId}`, []);
      console.log(items);

      // Flatten the nested array and map each element to an object with a 'contactId' property
      const answer = items.map(item => {
        return {
          customerId, 
          contactId: item
        }
      })
      console.log(answer);

      return answer;
    } catch (error) {
      console.error(`Error getting items for ${key}:`, error);
      throw error;
    }
  },
  // Add a new item related to a parent item
  add: async (customerId, contactId) => {
    try {
      
      // Ensure an array exists in the DB
      const check =  await db.getObjectDefault(`.customerContacts.customerIds.${customerId}`);
      console.log(check);

      // Create an array if it does not exist
      if (typeof variable === 'undefined') {
        await db.push(`.customerContacts.customerIds`, { [customerId]: [contactId] }, false );
      } else {
        // Push the new item to the array
        await db.push(`.customerContacts.customerIds`, { [customerId]: contactId }, false);
      }
      // Return the updated array
      const newItems = await db.getObjectDefault(`.customerContacts.customerIds.${customerId}`, []);
      console.log(newItems);
      const answer = newItems.map(item => {
        return {
          customerId, 
          contactId: item
        }
      })
      console.log("answer: ",answer);
      return answer;
    } catch (error) {
      console.error(`Error adding item: `, error);
      throw error;
    }
  },
  // Remove an item related to a parent item
  remove: async (customerId, contactId) => {
    try {
      console.log('received DELETE customerContact (models)');
  
      // Get the existing items from the database
      const items = await db.getObjectDefault(`.customerContacts.customerIds.${customerId}`, []);
      console.log(items);

      // Flatten the nested array and map each element to an object with a 'contactId' property
      
      const newContacts = items.filter(contact => contact !== contactId && contact !== null );
      console.log(newContacts);
      await db.push(`.customerContacts.customerIds.${customerId}`, newContacts );
      const newItems = await db.getObjectDefault(`.customerContacts.customerIds.${customerId}`, []);
      console.log(newItems);
      const answer = newItems.map(item => {
        return {
          customerId, 
          contactId: item
        }
      })
      return answer;
    } catch (error) {
      console.error(`Error removing item from customerContacts for parent:`, error);
      throw error;
    }
  },
  
  
  
  
  
});

// Exporting models for 'customers', 'contacts', and 'customerContacts'
export const Customers = createModel('customers');
export const Contacts = createModel('contacts');
export const CustomerContacts = createOneToManyModel('customerContacts');