import supertest from 'supertest';
import { describe, it } from 'mocha';
import app from '../app/app.js'; 
import { expect } from 'chai';

const request = supertest(app);


describe('Routes', () => {

  // Ping Pong test
  describe('GET /ping', () => {
    it('should return "pong"', async () => {
      const response = await request.get('/ping');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'pong' });
    })
  })


  // Customers tests
  describe('Customers Routes', () => {
    
    // Test the route for fetching all contacts
    it('GET /api/customers should return all customers', async () => {
      const response = await request.get('/api/customers');
      expect(response.status).to.equal(200);
    })
    
    
    // Test the route for fetching contacts of a customer
    it('GET /api/customers/:customerId/contacts should return contacts for a specific customer', async () => {
      // Assuming customerId exists in your database
      const customerId = 'your_customer_id';
      // Make a GET request to the specified route
      const response = await request.get(`/api/customers/${customerId}/contacts`);
      // Assert that the response status is 200
      expect(response.status).to.equal(200);
      // Assert that the response body is an array (contacts)
      expect(response.body).to.be.an('array')
    })
    // TODO: Add tests for other customer routes
  })


  // Contacts tests
  describe('Contacts Routes', () => {
    it('GET /api/contacts should return all contacts', async () => {
      const response = await request.get('/api/contacts');
      expect(response.status).to.equal(200);
    })
    
    // TODO: Add tests for other contact routes (GET /api/contacts/:contactId, POST /api/contacts)
  })
})