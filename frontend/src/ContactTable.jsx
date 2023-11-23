import PropTypes from 'prop-types'


// Functional component for rendering a table of contacts
const Table = ({ contacts }) => {
  return (
    <table className="table">
      {/* Table header with columns: Index, Name, Country */}
      <thead>
        <tr>
          <th scope="col">#</th> {/* Index column */}
          <th scope="col">Name</th> {/* Name column */}
          <th scope="col">Country</th> {/* Country column */}
        </tr>
      </thead>
      {/* Table body with contact information */}
      <tbody>
        {contacts.map((contact, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th> {/* Index of the contact */}
              <td>{`${contact.firstName} ${contact.lastName}`}</td> {/* Full name of the contact */}
              <td>{contact.country}</td> {/* Added a column for 'Country' */}
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
      country: PropTypes.string, // Added 'country' prop type
    })
  ),
};

// Exporting the Table component
export default Table;
