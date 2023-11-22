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
    return Object.values(items)
  },
  // Get a specific item by ID from the specified key
  get: async (id) => db.getObject(`.${key}.${id}`),
  // Add a new item to the specified key
  add: async (data) => {
    const id = getId()
    const newItem = { ...data, id }
    await db.push(`.${key}`, { [id]: newItem }, false)
    return newItem
  },
  // Update an existing item in the specified key
  update: async (id, data) => {
    await db.push(`.${key}`, {
      [id]: data
    }, false)
    return data
  },
  // Delete an item by ID from the specified key
  delete: async (id) => db.delete(`.${key}.${id}`)
})

// Function to create a model for a one-to-many relationship
const createOneToManyModel = (key, modifier) => ({
  // Get all items related to a parent item
  getAll: async (parentId) => {
    const items = await db.getObjectDefault(`.${key}.${parentId}`, [])
    return items.map(modifier)
  },
  // Add a new item related to a parent item
  add: async (parentId, subId) => {
    const newItem = { parentId, subId }
    await db.push(`.${key}.${parentId}[]`, newItem)
    return modifier(newItem)
  },
  // Delete a specific item related to a parent item
  delete: async (parentId, subId) => {
    const items = await db.getObjectDefault(`.${key}.${parentId}`, [])
    const filtered = items.filter(item => item.subId !== subId)
    await db.push(`.${key}.${parentId}`, filtered, true)
    return
  },
  // Delete all items related to a parent item
  deleteAll: async (parentId) => db.delete(`.${key}.${parentId}`),
})

// Exporting models for 'customers', 'contacts', and 'customerContacts'
export const Customers = createModel('customers')
export const Contacts = createModel('contacts')
export const CustomerContacts = createOneToManyModel('customerContacts', ({ parentId, subId }) => ({ customerId: parentId, contactId: subId }))