import { useDispatch } from 'react-redux'
import { createCustomerContacts } from '../../redux/CustomerContactSlices'

export const NewCustomerContact = ({customerId}) => {
  const dispatch = useDispatch()

  const createNewDummyCustomerContact = async () => {
    dispatch(createCustomerContacts({ 
        customerId: customerId,
        contactId: "id-3434654" }))
  }
  
  return (
    <button 
      onClick={() => createNewDummyCustomerContact()}>
      <i className="bi bi-plus" />
      {' '}
      Add new dummy customer contact
    </button>
  )
}

NewCustomerContact.propTypes = {}

//export const NewCustomerContact(customerId);