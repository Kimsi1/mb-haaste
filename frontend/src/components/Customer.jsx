import React from 'react';
import { useParams } from 'react-router-dom';
import useCustomer from '../hooks/useCustomer';
import MBTodo from './common/MBTodo';
import CustomerContactTable from './common/CustomerContactTable';
import { useDispatch } from 'react-redux';
import { updateCustomerData } from '../redux/customerSlices'

const Customer = () => {
    // Extracting 'customerId' from the URL parameters
    const { customerId } = useParams();
    // Using the custom hook to fetch and manage individual customer data
    const { data: customer } = useCustomer(customerId);
    
    const dispatch = useDispatch();
  
    const handleToggleActivity = async (newIsActive) => {
      try {
        // Dispatch the updateCustomerData action with the updated isActive field
        dispatch(updateCustomerData({
          customerId: customer.id,
          updatedData: { ...customer, isActive: newIsActive },
        }));
      } catch (error) {
        console.error('Error updating customer data:', error);
      }
    };


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
                isCompleted={true}
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
                  <label htmlFor="isActive" className="form-label">
                    Activity
                  </label>
                  {/* Display the current status as a button, and allow it to be clicked */}
                  <button
                    className={`btn btn-${customer.isActive ? 'success' : 'danger'}`}
                    onClick={() => handleToggleActivity(!customer.isActive)}
                    type='button'
                  >
                    {customer.isActive ? 'Active' : 'Inactive'}
                  </button>
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

export default Customer