import PropTypes from 'prop-types';

// Functional component for rendering a table of contacts
const Table = ({ contacts }) => {
  return (
    <table className="table">
      {/* Table header with columns: Index, Name */}
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      {/* Table body with contact information */}
      <tbody>
        {contacts.map((contact, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{`${contact.firstName} ${contact.lastName}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// PropTypes to specify the expected structure of the 'contacts' prop
Table.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    })
  ),
};

export default Table