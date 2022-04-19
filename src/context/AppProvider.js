import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';
import fetchPlanets from '../services/fetchPlanets';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  useEffect(() => {
    const getPlanets = async () => {
      const results = await fetchPlanets();
      setData(results);
      setPrevData(results);
    };
    getPlanets();
  }, []);

  const filterName = (name) => {
    const newData = prevData
      .filter((planets) => planets.name
        .includes(name));
    setData(newData);
    setFilterByName(name);
  };

  const object = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filterName,
  };

  return (
    <AppContext.Provider value={ object }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: propTypes.any,
}.isRequired;

export default AppProvider;
