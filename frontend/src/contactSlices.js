import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from './api';

// Initial state for the contacts slice in the Redux store
const initialState = {
  data: [],
  status: 'idle',
  error: null,
  currentRequestId: null,
};

// Creating a Redux slice for managing contact data
const contactsSlice = createSlice({
  name: 'contacts', 
  initialState, 
  reducers: {}, // Define reducers here
  
  // Extra reducers handling different states during asynchronous operations
  extraReducers: (builder) => {
    builder
      // If the current status is 'idle', update to 'pending' and set the current request ID
      .addCase(fetchContacts.pending, (state, action) => {
        const { requestId } = action.meta;
        if (state.status === 'idle') {
          state.status = 'pending';
          state.currentRequestId = requestId;
        }
      })
      // If the status is 'pending' and matches the current request ID, update the state with the fetched data
      .addCase(fetchContacts.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle';
          state.data = action.payload;
          state.currentRequestId = null;
        }
      })
      // If the status is 'pending' and matches the current request ID, update the state with the error information
      .addCase(fetchContacts.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle';
          state.error = action.error;
          state.currentRequestId = null;
        }
      });
  },
});

// Exporting the reducer from the slice
export const contactReducer = contactsSlice.reducer;

// Creating an asynchronous thunk for fetching contact data
export const fetchContacts = createAsyncThunk(
  'contacts',
  async () => {
    // Fetching contact data from the backend and return results
    const result = await client('/api/contacts');
    return result;
  },
  {
    // Condition to check if the current status is not 'pending' before making a new request
    condition: (_args, { getState }) => {
      const { contacts } = getState();
      return contacts.status !== 'pending';
    },
  }
);
