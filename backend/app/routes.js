import express from 'express';
import { Contacts, CustomerContacts, Customers } from './models.js';
import { NotFound, NotImplemented } from './errorHandler.js';

// Create an Express router
const routes = express.Router();

// Ping route for testing
routes.get('/ping', (_req, res) => {
  return res.send({ message: 'pong' });
});

// Customers routes

// Get all customers
routes.get('/api/customers', async (_req, res) => {
  const customers = await Customers.getAll();
  return res.send(customers);
});

// Get a specific customer by ID
routes.get('/api/customers/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const customer = await Customers.get(customerId);
  if (!customer) {
    // Throw a NotFound error if the customer is not found
    throw new NotFound('Customer Not Found');
  }
  return res.send(customer);
});

// Add a new customer
routes.post('/api/customers', async (req, res) => {
  const customers = await Customers.add(req.body);
  return res.send(customers);
});

// MB-TODO: Create route for updating customer
routes.put('/api/customers/:customerId', async (req, res) => {
  try {
    // Extract customer ID from the request parameters
    const { customerId } = req.params;
    console.log('customerId:', customerId);
    console.log('req.body:', req.body);
    // Get the existing customer data
    const existingCustomer = await Customers.get(customerId);
    // If the customer doesn't exist, throw a NotFound error
    if (!existingCustomer) {
      throw new NotFound('Customer Not Found');
    }
    // Update the existing customer with the new data from the request body
    const updatedCustomer = await Customers.update(customerId, req.body);
    // Return the updated customer data in the response
    return res.send(updatedCustomer);
  } catch (error) {
    console.error('Error in route:', error);
    // Handle errors and return an appropriate response
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Contacts routes

// Get all contacts
routes.get('/api/contacts', async (_req, res) => {
  const contacts = await Contacts.getAll();
  return res.send(contacts);
});

// Get a specific contact by ID
routes.get('/api/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.get(contactId);
  if (!contact) {
    // Throw a NotFound error if the contact is not found
    throw new NotFound('Contact not found');
  }
  return res.send(contact);
});

// Add a new contact
routes.post('/api/contacts', async (req, res) => {
  const contacts = await Contacts.add(req.body);
  return res.send(contacts);
});



// MB-TODO: Create route for fetching contacts of a customer `/api/customers/:customerId/contacts`
routes.get('/api/customers/:customerId/contacts', async (req, res) => {
  try {
    // Extract customer ID from the request parameters
    const { customerId } = req.params;
    // Get all contacts related to the specified customer ID
    const customerContacts = await CustomerContacts.getAll(customerId);
    // Map the contacts to get the contact details (excluding parentId and subId)
    const contacts = customerContacts.map(({ customerId, contactId }) => ({ customerId, contactId }));
    return res.send(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    // Handle errors and return an appropriate response
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

// MB-TODO: Create route for adding contact to a customer `/api/customers/:customerId/contacts`
routes.post('/api/customers/:customerId/contacts', async (req, res) => {
  try {
    // Extract customer ID from the request parameters
    const { customerId } = req.params;
    // Extract contact data from the request body
    const contactData = req.body;
    // Add the new contact to the specified customer
    const addedContact = await CustomerContacts.add(customerId, contactData);
    // Return the added contact in the response
    return res.status(201).send(addedContact);
  } catch (error) {
    // Handle errors and return an appropriate response
    console.error('Error adding contact:', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

// MB-TODO: Create route for deleting contact of customer `/api/customers/:customerId/contacts/:contactId`
routes.delete('/api/customers/:customerId/contacts/:contactId', async (req, res) => {
  try {
    // Extract customer ID and contact ID from the request parameters
    const { customerId, contactId } = req.params;
    // Delete the specified contact of the customer
    const deletedContact = await CustomerContacts.delete(customerId, contactId);
    // If the contact was not found, throw a NotFound error
    if (!deletedContact) {
      throw new NotFound('Contact Not Found');
    }
    // Return the deleted contact in the response
    return res.send(deletedContact);
  } catch (error) {
    console.error('Error deleting contact:', error);
    // Handle errors and return an appropriate response
    if (error instanceof NotFound) {
      return res.status(404).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Export the Express router
export default routes
