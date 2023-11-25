import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerContacts } from '../../redux/CustomerContactSlices'; // Update the path

const Table = ({ customerId }) => {
  const dispatch = useDispatch();

  // Fetch customer contacts when the component mounts or when customerId changes
  useEffect(() => {
    dispatch(fetchCustomerContacts(customerId));
  }, [dispatch, customerId]);

  // Retrieve customer contacts from the Redux store
  const { data: customerContacts, status } = useSelector((state) => state.customerContacts);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {customerContacts.map((customerContact, index) => (
          <tr key={index}>
            <td scope="row">{index + 1}</td>
            <td>{customerContact.contactId}</td>
            <td>
              <button className='btn btn-danger'>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;


// MB-TODO: Implement fetch customer's contacts
  // MB-TODO: Implement add contact to customer
  // MB-TODO: Implement remove contact of customer

