import supertest from 'supertest';
import { describe, it } from 'mocha';
import app from '../app/app.js'; 
import { expect } from 'chai';

const request = supertest(app);

// ping pong test
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
    it('GET /api/customers should return all customers', async () => {
      const response = await request.get('/api/customers');
      expect(response.status).to.equal(200);
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