import React, { useState } from 'react';
import NewCustomer from './common/NewCustomer';
import CustomerTable from './common/CustomerTable';
import useCustomers from '../hooks/useCustomers';
import MBTodo from './common/MBTodo';

const Customers = () => {
  const { data: customers, status, error, refetch } = useCustomers();
  const [showActive, setShowActive] = useState(null);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  // Filter and sort customers based on activity and alphabetically
  const filteredCustomers = customers
    .filter(customer =>
      showActive === null ? true : showActive ? customer.isActive : !customer.isActive
    )
    .sort((a, b) => (sortAlphabetically ? a.name.localeCompare(b.name) : 0));

  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Customers</h1>
      <div className='d-flex justify-content-between'>
        <button className='btn btn-success' onClick={refetch}>
          <i className="bi bi-arrow-clockwise" />
          {' '}
          Refresh
        </button>
        <NewCustomer />
      </div>
      <div>
        {error ? (
          <div className="alert alert-danger d-inline-block" role="alert">
            {error.message}
          </div>
        ) : null}

      <div className='card my-3'>
        <div className='card-body'>
          <i className="bi bi-filter" />
          {' '}
          Filters
          <div>
            <MBTodo isCompleted={false} task='Create solution to filters customers by activity' />
          
          <div className="mb-3">
            <button
              className={`btn ${showActive === null ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setShowActive(null)}
            >
              All Customers
            </button>
            <button
              className={`btn ${showActive ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setShowActive(true)}
            >
              Active Customers
            </button>
            <button
              className={`btn ${showActive === false ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setShowActive(false)}
            >
              Inactive Customers
            </button>
            <div className="form-check form-switch ml-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="alphabeticalSorting"
                checked={sortAlphabetically}
                onChange={() => setSortAlphabetically(!sortAlphabetically)}
              />
              <label className="form-check-label" htmlFor="alphabeticalSorting">
                Alphabetical Sorting
              </label>
            </div>
          </div>
          </div>
        </div>
      </div>
        {status === 'pending' ? (
          'Loading...'
        ) : (
          <CustomerTable customers={filteredCustomers} />
        )}
      </div>
    </div>
  );
};

export default Customers;
