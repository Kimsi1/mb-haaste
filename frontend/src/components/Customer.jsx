import React, { useState }  from 'react';
import { useParams } from 'react-router-dom';
import useCustomer from '../hooks/useCustomer';
import MBTodo from './common/MBTodo';
import CustomerContactTable from './common/CustomerContactTable';
import { useDispatch } from 'react-redux';
import { updateCustomerData } from '../redux/customerSlices'
import { NewCustomerContact } from './common/NewCustomerContact';

const Customer = () => {
    // Extracting 'customerId' from the URL parameters
    const { customerId } = useParams();
    // Using the custom hook to fetch and manage individual customer data
    const { data: customer } = useCustomer(customerId);
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    
  
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
    const saveCustomerData = async (data) => {
      try {
        // Dispatch the updateCustomerData action with the updated isActive field
        dispatch(updateCustomerData({
          customerId: customer.id,
          updatedData: { ...customer, name: data.name, country: data.country  },
        }));
      } catch (error) {
        console.error('Error updating customer data:', error);
      }
    };

    if(!customer) return 'loading..'

    return (
      <div className='m-5'>
        <h1 className='fw-bold'>Customer</h1>
        {/* Displaying customer details if available */}
        {customer
          ? <div>
              {/* Form for updating customer details */}
              <form className='mb-5' onSubmit={event => {
                // MB-TODO: Handle customer update
                event.preventDefault();}}
              >
              {/* MB-TODO: Task for updating customer's 'isActivity' field */}
              <MBTodo
                isCompleted={true}
                task='Create solution to update customers `isActivity` field. NOTE: update api `/api/customer/:customerId` expects complete customer data to be sent along request body' 
              />
              {/* Form fields for customer details */}
              <div className='d-flex flex-row gap-4 mb-3'>
                <div>
                  <label htmlFor="name" className="form-label">Name</label>
                  <input className="form-control" id="name" value={name || customer.name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="name" className="form-label">Country</label>
                  <input className="form-control" id="country" value={country || customer.country} onChange={e => setCountry(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="isActive" className="form-label">
                    Activity (click to change):
                  </label>
                </div>
                <div>
                  {/* Display the current status as a button, and allow it to be clicked */}
                  <button
                    className={`btn btn-${customer.isActive ? 'success' : 'danger'}`}
                    id="isActive"
                    onClick={() => handleToggleActivity(!customer.isActive)}
                    type='button'
                  >
                    {customer.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
              <p>Edit details and click save</p>
              <div className='d-flex flex-row gap-4 mb-3'>
                <div>
                  {/* Button for saving changes */}
                  <button className='btn btn-primary' 
                    onClick={() => saveCustomerData( {
                      name: document.getElementById('name').value, 
                      country: document.getElementById('country').value} )} 
                    >Save
                  </button>
                </div>
              </div>
            </form>
            {/* MB-TODO: Task for continuing CustomerContact table implementation */}
            <MBTodo
              isCompleted={true}
              task='Continue CustomerContact table implementation' 
            />
            {/* Displaying customer contacts */}
            <div className='d-flex justify-content-between'>
              <p className='fw-bold'>Customer contacts</p>
              {/* Component for creating a dummy customer contact */}
              <NewCustomerContact customerId={customerId} />
            </div>
            {/* Component for displaying customer contacts */}
            <CustomerContactTable customerId={customerId} />
          </div>
        : null}
      </div>
    )
  }

export default Customer