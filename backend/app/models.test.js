import { Contacts, CustomerContacts, Customers } from './models.js';

const testCustomerModel = async () => {
  try {
    // Customers
    const all = await Customers.getAll();
    console.log('all', all);

    const newItem = await Customers.add({ name: 'Cust.Omer' });
    console.log('newItem', newItem);

    const single = await Customers.get(newItem.id);
    console.log('single', single);

    const updated = await Customers.update(single.id, { id: single.id, name: 'Customer', country: 'Finland' });
    console.log('updated', updated);

    const allModified = await Customers.getAll();
    console.log('allModified', allModified);

    const deleted = await Customers.delete(updated.id);
    console.log('deleted', deleted);

    const allDeleted = await Customers.getAll();
    console.log('allDeleted', allDeleted);
  } catch (error) {
    console.error('Error in testCustomerModel:', error);
  }
};

const testContactModel = async () => {
  try {
    // Contacts
    const all = await Contacts.getAll();
    console.log('all', all);

    const newItem = await Contacts.add({ name: 'Cont.Act' });
    console.log('newItem', newItem);

    const single = await Contacts.get(newItem.id);
    console.log('single', single);

    const updated = await Contacts.update(single.id, { id: single.id, name: 'Contact', country: 'Finland' });
    console.log('updated', updated);

    const allModified = await Contacts.getAll();
    console.log('allModified', allModified);

    const deleted = await Contacts.delete(updated.id);
    console.log('deleted', deleted);

    const allDeleted = await Contacts.getAll();
    console.log('allDeleted', allDeleted);
  } catch (error) {
    console.error('Error in testContactModel:', error);
  }
};

const testCustomerContactModel = async () => {
  try {
    // CustomerContacts
    const customerId = 'customerId-1';
    const contactId = 'contactId-1';

    const all = await CustomerContacts.getAll(customerId);
    console.log('all', all);

    const newItem = await CustomerContacts.add(customerId, contactId);
    console.log('newItem', newItem);

    const allCreated = await CustomerContacts.getAll(customerId);
    console.log('allCreated', allCreated);

    const deleted = await CustomerContacts.delete(customerId, contactId);
    console.log('deleted', deleted);

    const allDeleted = await CustomerContacts.getAll(customerId);
    console.log('allDeleted', allDeleted);
  } catch (error) {
    console.error('Error in testCustomerContactModel:', error);
  }
};

// Run tests
testCustomerModel();
testContactModel();
testCustomerContactModel();