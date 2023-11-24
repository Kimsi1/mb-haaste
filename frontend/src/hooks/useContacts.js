import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contactSlices';

const useContacts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const refetch = () => dispatch(fetchContacts());

  const { data, status, error } = useSelector((state) => state.contacts);

  return { data, status, error, refetch };
};

export default useContacts;
