import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerById } from '../redux/customerSlices';

const useCustomer = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id));
    }
  }, [id, dispatch]);

  const { data: customers, status, error } = useSelector((state) => state.customers);
  const customer = customers.find((customer) => customer.id === id);

  return { data: customer, status, error };
};

export default useCustomer;
