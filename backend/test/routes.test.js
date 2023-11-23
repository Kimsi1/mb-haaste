import supertest from 'supertest';
import { describe, it } from 'mocha';
import app from '../app/app.js'; 
import { expect } from 'chai';

const request = supertest(app);

// Ping Pong test
describe('Routes', () => {
  describe('GET /ping', () => {
    it('should return "pong"', async () => {
      const response = await request.get('/ping');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'pong' });
    });
  });


// Customers tests
  describe('Customers Routes', () => {
    
    // Test the route for fetching all contacts
    it('GET /api/customers should return all customers', async () => {
      const response = await request.get('/api/customers');
      expect(response.status).to.equal(200);
    });
    
    
    // Test the route for fetching contacts of a customer
    it('GET /api/customers/:customerId/contacts should return contacts for a specific customer', async () => {
      // Assuming customerId exists in your database
      const customerId = 'your_customer_id';
      // Make a GET request to the specified route
      const response = await request.get(`/api/customers/${customerId}/contacts`);
      // Assert that the response status is 200
      expect(response.status).to.equal(200);
      // Assert that the response body is an array (contacts)
      expect(response.body).to.be.an('array');
    
    // Test the route for adding a contact to a customer
    it('POST /api/customers/:customerId/contacts should add a contact to a customer', async () => {
      // Assuming customerId exists in your database
      const customerId = 'your_customer_id';
      // Sample contact data to be added
      const contactData = { id: 'testid-99999', firstName: 'testFname', lastName: 'testLname' };
      // Make a POST request to the specified route
      const response = await request.post(`/api/customers/${customerId}/contacts`).send(contactData);
      // Assert that the response status is 201 (created)
      expect(response.status).to.equal(201);
      // Assert that the response body is the added contact
      expect(response.body).to.be.an('object');
      // For example, if each contact should have customerId and contactId properties
      //expect(response.body).to.have.property('customerId', customerId);
      //expect(response.body).to.have.property('contactId');
    });

    // Test the route for deleting a contact of a customer
    it('DELETE /api/customers/:customerId/contacts/:contactId should delete a contact of a customer', async () => {
      // Assuming customerId and contactId exist in your database
      const customerId = 'your_customer_id';
      const contactId = 'your_contact_id';
      // Make a DELETE request to the specified route
      const response = await request.delete(`/api/customers/${customerId}/contacts/${contactId}`);
      // Assert that the response status is 200
      expect(response.status).to.equal(200);
      // Assert that the response body is the deleted contact
      expect(response.body).to.be.an('object');
      // For example, if each contact should have customerId and contactId properties
      //expect(response.body).to.have.property('customerId', customerId);
      //expect(response.body).to.have.property('contactId', contactId);
    });

      
      // Test if each contact has customerId and contactId properties
      //if (response.body.length > 0) {
      //  const contact = response.body[0];
      //  expect(contact).to.have.property('customerId');
      //  expect(contact).to.have.property('contactId');
      //}
    
  });

    // TODO: Add tests for other customer routes (GET /api/customers/:customerId, POST /api/customers, PUT /api/customers/:customerId)
  });


// Contacts tests
  describe('Contacts Routes', () => {
    it('GET /api/contacts should return all contacts', async () => {
      const response = await request.get('/api/contacts');
      expect(response.status).to.equal(200);
    });
    // TODO: Add tests for other contact routes (GET /api/contacts/:contactId, POST /api/contacts)

  });
});