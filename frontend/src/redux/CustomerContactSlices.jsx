import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../api';

// Initial state for the customerContacts slice in the Redux store
const initialState = {
  data: [],
  status: 'idle',
  error: null,
  currentRequestId: null,
};

// Creating a Redux slice for managing customer contact data
const customerContactsSlice = createSlice({
  name: 'customerContacts', 
  initialState, 
  reducers: {},
  
  // Extra reducers handling different states during asynchronous operations
  extraReducers: (builder) => {
    builder
      // If the current status is 'idle', update to 'pending' and set the current request ID
      .addCase(fetchCustomerContacts.pending, (state, action) => {
        const { requestId } = action.meta;
        if (state.status === 'idle') {
          state.status = 'pending';
          state.currentRequestId = requestId;
        }
      })
      // If the status is 'pending' and matches the current request ID, update the state with the fetched data
      .addCase(fetchCustomerContacts.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle';
          state.data = action.payload;
          state.currentRequestId = null;
        }
      })
      // If the status is 'pending' and matches the current request ID, update the state with the error information
      .addCase(fetchCustomerContacts.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle';
          state.error = action.error;
          state.currentRequestId = null;
        }
      });
  },
});

// Exporting the reducer and actions from the slice
export const { addContact, removeContact } = customerContactsSlice.actions;
export const customerContactsReducer = customerContactsSlice.reducer;

// Creating an asynchronous thunk for fetching customer contact data
export const fetchCustomerContacts = createAsyncThunk(
  'customerContacts',
  async (customerId) => {
    const result = await client(`/api/customer/${customerId}/contacts`);
    return result;
  },
  {
    // Condition to check if the current status is not 'pending' before making a new request
    condition: (_args, { getState }) => {
      const { customerContacts } = getState();
      return customerContacts.status !== 'pending';
    },
  }
);
