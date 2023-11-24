import React from 'react';
import ContactTable from './Common/ContactTable';
import useContacts from '../hooks/useContacts';


const Contacts = () => {
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

  export default Contacts