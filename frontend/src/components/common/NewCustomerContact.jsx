import { useDispatch } from 'react-redux'
import { createCustomerContacts } from '../../redux/CustomerContactSlices'

export const NewCustomerContact = ({customerId}) => {
  const dispatch = useDispatch()

  const createNewDummyCustomerContact = async () => {
    dispatch(createCustomerContacts({ 
        customerId: customerId,
        contactId: "dummy-id" }))
  }
  
  return (
    <button className='btn btn-outline-primary'
      onClick={() => createNewDummyCustomerContact()}>
      <i className="bi bi-plus" />
      {' '}
      Add new dummy customer contact
    </button>
  )
}

NewCustomerContact.propTypes = {}

