import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../redux/customerSlices';
import { fetchContacts } from '../redux/contactSlices';

const useCustomers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const refetch = () => dispatch(fetchContacts());

  const { data, status, error } = useSelector((state) => state.customers);

  return { data, status, error, refetch };
};

export default useCustomers;