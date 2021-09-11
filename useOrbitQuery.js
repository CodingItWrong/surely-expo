import {useEffect, useState} from 'react';
import {useStore} from './store';

const defaultStoreReady = () => Promise.resolve();

const useOrbitQuery = ({storeReady = defaultStoreReady, query}) => {
  const store = useStore();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    storeReady().then(() => {
      store.on('transform', () => {
        setRecords(store.cache.query(query));
      });
      store.query(query);
    });
  }, [storeReady, store, query]);

  return records;
};

export default useOrbitQuery;
