import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';


const Table = ({ customers }) => {
  const navigate = useNavigate();

  const clicker = (customer) => {
    navigate(customer.id);
  };

  return (
    <>
      
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Country</th>
            <th scope="col">Is Active</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={index}
              className=''
              onClick={() => clicker(customer)}
            >
              <td scope="row">{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.country}</td>
              <td>{customer.isActive ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    isActive: PropTypes.bool
  }))
}


export default Table