import {useEffect, useState} from 'react';

const defaultStoreReady = () => Promise.resolve();

const useOrbitQuery = ({storeReady = defaultStoreReady, store, query}) => {
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
