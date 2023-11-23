import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { Contacts, CustomerContacts, Customers } from '../app/models.js';

// Helper function to log results
const logResults = (label, result) => {
  console.log(`${label}:`, result);
};

describe('Customer Model', () => {
  before(async () => {
    // You might want to initialize or clean up some data before running the tests
  });

  it('should perform CRUD operations on Customers', async () => {
    try {
      const all = await Customers.getAll();
      logResults('All Customers', all);

      const newItem = await Customers.add({ name: 'Cust.Omer' });
      logResults('Added Customer', newItem);

      const single = await Customers.get(newItem.id);
      logResults('Single Customer', single);

      const updated = await Customers.update(single.id, { id: single.id, name: 'Customer', country: 'Finland' });
      logResults('Updated Customer', updated);

      const allModified = await Customers.getAll();
      logResults('All Customers after Update', allModified);

      const deleted = await Customers.delete(updated.id);
      logResults('Deleted Customer', deleted);

      const allDeleted = await Customers.getAll();
      logResults('All Customers after Delete', allDeleted);

      // Use Chai assertions to check expectations
      expect(all).to.be.an('array');
      expect(newItem).to.have.property('name', 'Cust.Omer');
      // Add more assertions based on your specific data and expectations
    } catch (error) {
      throw new Error(`Error in testCustomerModel: ${error}`);
    }
  });
});

describe('Contact Model', () => {
  before(async () => {
    // You might want to initialize or clean up some data before running the tests
  });

  it('should perform CRUD operations on Contacts', async () => {
    try {
      const all = await Contacts.getAll();
      logResults('All Contacts', all);

      const newItem = await Contacts.add({ name: 'Cont.Act' });
      logResults('Added Contact', newItem);

      const single = await Contacts.get(newItem.id);
      logResults('Single Contact', single);

      const updated = await Contacts.update(single.id, { id: single.id, name: 'Contact', country: 'Finland' });
      logResults('Updated Contact', updated);

      const allModified = await Contacts.getAll();
      logResults('All Contacts after Update', allModified);

      const deleted = await Contacts.delete(updated.id);
      logResults('Deleted Contact', deleted);

      const allDeleted = await Contacts.getAll();
      logResults('All Contacts after Delete', allDeleted);

      // Use Chai assertions to check expectations
      expect(all).to.be.an('array');
      expect(newItem).to.have.property('name', 'Cont.Act');
      // Add more assertions based on your specific data and expectations
    } catch (error) {
      throw new Error(`Error in testContactModel: ${error}`);
    }
  });
});

describe('CustomerContact Model', () => {
  before(async () => {
    // You might want to initialize or clean up some data before running the tests
  });

  it('should perform operations on CustomerContacts', async () => {
    try {
      const customerId = 'customerId-1';
      const contactId = 'contactId-1';

      const all = await CustomerContacts.getAll(customerId);
      logResults('All CustomerContacts', all);

      const newItem = await CustomerContacts.add(customerId, contactId);
      logResults('Added CustomerContact', newItem);

      const allCreated = await CustomerContacts.getAll(customerId);
      logResults('All CustomerContacts after Add', allCreated);

      const deleted = await CustomerContacts.delete(customerId, contactId);
      logResults('Deleted CustomerContact', deleted);

      const allDeleted = await CustomerContacts.getAll(customerId);
      logResults('All CustomerContacts after Delete', allDeleted);

      // Use Chai assertions to check expectations
      expect(all).to.be.an('array');
      // Add more assertions based on your specific data and expectations
    } catch (error) {
      throw new Error(`Error in testCustomerContactModel: ${error}`);
    }
  });
});