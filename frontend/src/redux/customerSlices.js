import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  currentRequestId: null
}

// CUSTOMERS
const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'idle') {
          state.status = 'pending'
          state.currentRequestId = requestId
        }
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.data = action.payload
          state.currentRequestId = null
        }
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.error = action.error
          state.currentRequestId = null
        }
      })
      .addCase(fetchCustomerById.pending, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'idle') {
          state.status = 'pending'
          state.currentRequestId = requestId
        }
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.data = state.data.concat(action.payload)
          state.currentRequestId = null
        }
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.error = action.error
          state.currentRequestId = null
        }
      })
      .addCase(createCustomer.pending, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'idle') {
          state.status = 'pending'
          state.currentRequestId = requestId
        }
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.data = state.data.concat(action.payload)
          state.currentRequestId = null
        }
      })
      .addCase(createCustomer.rejected, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.error = action.error
          state.currentRequestId = null
        }
      })

      .addCase(updateCustomerData.pending, (state, action) => {
        const { requestId } = action.meta;
        if (state.status === 'idle') {
          state.status = 'pending';
          state.currentRequestId = requestId;
        }
      })
  
      .addCase(updateCustomerData.fulfilled, (state, action) => {
        const { requestId } = action.meta;
      
        if (state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle';
          state.data = state.data.map(customer => 
            customer.id === action.payload.id ? action.payload : customer
          );
          state.currentRequestId = null;
        }
      })
      
      .addCase(updateCustomerData.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle';
          state.error = action.error;
          state.currentRequestId = null;
        }
      })
  },
})
export const customerReducer = customersSlice.reducer

export const fetchCustomers = createAsyncThunk(
  'customers',
  async () => {
    const result = await client('/api/customers')
    return result
  },
  {
    condition: (_args, { getState }) => {
      const { customers } = getState()
      return customers.status !== 'pending'
    }
  }
)

export const fetchCustomerById = createAsyncThunk(
  'customers/fetchById',
  async (id) => {
    const result = await client(`/api/customers/${id}`)
    return result
  },
  {
    condition: (id, { getState }) => {
      const { customers } = getState()
      return customers.status !== 'pending' && !customers.data.some(customer => customer.id === id)
    }
  }
)

// Update customer data
export const updateCustomerData = createAsyncThunk(
  'customers/updateData',
  async ({ customerId, updatedData }, { requestId, dispatch }) => {
    try {
      const result = await client(`/api/customers/${customerId}`, {
        data: updatedData,
        method: 'PUT',
      })
      // Dispatch the fulfilled action
      dispatch(updateCustomerData.fulfilled(result, requestId));
      
      return result; // This value will be the payload of the fulfilled action
    } catch (error) {
      console.error('updateCustomerData error:', error);

      // Dispatch the rejected action
      dispatch(updateCustomerData.rejected(error, requestId));

      throw error; // Re-throw the error to propagate it
    }
  }
)


export const createCustomer = createAsyncThunk(
  'customers/create',
  async (data) => {
    const result = await client(`/api/customers`, { data, method: 'POST' })
    return result
  }
)


// MB-TODO: create action for creating customer contacts. NOTE: remember to add them to `customerSlice`
export const createCustomerContacts = createAsyncThunk(
  'customers/createContacts',
  async ({ customerId, contactData }) => {
    const result = await client(`/api/customers/${customerId}/contacts`, {
      data: contactData,
      method: 'POST',
    });
    return result.data; 
  }
)