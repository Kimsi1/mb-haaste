import React from 'react';
import NewCustomer from './Common/NewCustomer';
import CustomerTable from './Common/CustomerTable';
import useCustomers from '../hooks/useCustomers';


const Customers = () => {
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

  export default Customers