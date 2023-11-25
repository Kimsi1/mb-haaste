import { configureStore } from '@reduxjs/toolkit';
import { customerReducer } from './customerSlices';
import { contactReducer } from './contactSlices';
import { customerContactsReducer } from './CustomerContactSlices'; // Update the path

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    contacts: contactReducer,
    customerContacts: customerContactsReducer, 
    
  },
});
