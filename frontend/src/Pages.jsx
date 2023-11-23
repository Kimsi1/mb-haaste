import { useEffect } from 'react';
import CustomerTable from './CustomerTable';
import ContactTable from './ContactTable';
import CustomerContactTable from './CustomerContactTable';
import { useParams } from 'react-router-dom';
import MBTodo from './MBTodo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerById, fetchCustomers } from './customerSlices';
import { fetchContacts } from './contactSlices';
import NewCustomer from './NewCustomer';

// Custom hook for fetching and managing customer data
const useCustomers = () => {
  // Using useDispatch to dispatch actions
  const dispatch = useDispatch();

  // Fetching customers when the component mounts
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Defining a function to refetch contacts
  const refetch = () => dispatch(fetchContacts());

  // Retrieving customers' data, status, and error from the Redux store
  const { data, status, error } = useSelector((state) => state.customers);

  return { data, status, error, refetch };
};

// Custom hook for fetching and managing individual customer data
const useCustomer = (id) => {
  const dispatch = useDispatch();

  // Fetching customer by ID when the 'id' parameter changes
  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id));
    }
  }, [id, dispatch]);

  // Retrieving customers' data, status, and error from the Redux store
  const { data: customers, status, error } = useSelector((state) => state.customers);

  // Finding the specific customer based on the provided ID
  const customer = customers.find((customer) => customer.id === id);
  return { data: customer, status, error };
};

// Custom hook for fetching and managing contact data
const useContacts = () => {
  const dispatch = useDispatch();

  // Fetching contacts when the component mounts
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Defining a function to refetch contacts
  const refetch = () => dispatch(fetchContacts());

  // Retrieving contacts' data, status, and error from the Redux store
  const { data, status, error } = useSelector((state) => state.contacts);
  return { data, status, error, refetch };
};

// Exporting components for Customers, Customer, and Contacts pages
export const Customers = () => {
  // Using the custom hook to fetch and manage customers' data
  const { data: customers, status, error, refetch } = useCustomers();
  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Customers</h1>
      <div className='d-flex justify-content-between'>
        {/* Button to manually refresh data */}
        <button className='btn btn-success' onClick={refetch}>
          <i className="bi bi-arrow-clockwise" />
          {' '}
          Refresh
        </button>
        {/* Component for adding a new customer */}
        <NewCustomer />
      </div>
      <div>
        {/* Displaying error message if there is an error */}
        {error
          ? <div className="alert alert-danger d-inline-block" role="alert">{error.message}</div>
          : null
        }
        {/* Displaying loading message or customer table */}
        {status === 'pending'
          ? 'Loading...'
          : <CustomerTable customers={customers} />
        }
      </div>
    </div>
  );
};

export const Customer = () => {
  // Extracting 'customerId' from the URL parameters
  const { customerId } = useParams();
  // Using the custom hook to fetch and manage individual customer data
  const { data: customer } = useCustomer(customerId);
  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Customer</h1>
      {/* Displaying customer details if available */}
      {customer
        ? <div>
          {/* Form for updating customer details */}
          <form className='mb-5' onSubmit={event => {
            // MB-TODO: Handle customer update
            event.preventDefault();
          }}>
            {/* MB-TODO: Task for updating customer's 'isActivity' field */}
            <MBTodo
              isCompleted={false}
              task='Create solution to update customers `isActivity` field. NOTE: update api `/api/customer/:customerId` expects complete customer data to be sent along request body' />
            {/* Form fields for customer details */}
            <div className='d-flex flex-row gap-4 mb-3'>
              <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input className="form-control" id="name" value={customer.name || ''} readOnly />
              </div>
              <div>
                <label htmlFor="name" className="form-label">Country</label>
                <input className="form-control" id="country" value={customer.country || ''} readOnly />
              </div>
              <div>
                <label htmlFor="isActive" className="form-label">Activity</label>
                <input className="form-control" id="isActive" value={customer.isActive ? 'Active' : 'Inactive'} readOnly />
              </div>
            </div>
            {/* Button for saving changes */}
            <button className='btn btn-primary' type='submit'>Save</button>
          </form>
          {/* Displaying customer contacts */}
          <div>
            <p className='fw-bold'>Customer contacts</p>
            {/* MB-TODO: Task for continuing CustomerContact table implementation */}
            <MBTodo
              isCompleted={false}
              task='Continue CustomerContact table implementation' />
            {/* Component for displaying customer contacts */}
            <CustomerContactTable customerId={customerId} />
          </div>
        </div>
        : null
      }
    </div>
  );
};

export const Contacts = () => {
  // Using the custom hook to fetch and manage contact data
  const { data: contacts, status, error, refetch } = useContacts();

  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Contacts</h1>
      {/* Button to manually refresh data */}
      <button className='btn btn-success' onClick={refetch}>
        <i className="bi bi-arrow-clockwise" />
        {' '}
        Refresh
      </button>
      {/* Displaying error message if there is an error */}
      {error
        ? <div className="alert alert-danger d-inline-block" role="alert">{error.message}</div>
        : null
      }
      <div>
        {/* Displaying loading message or contact table */}
        {status === 'pending'
          ? 'Loading...'
          : <ContactTable contacts={contacts} />
        }
      </div>
    </div>
  );
};