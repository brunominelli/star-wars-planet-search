import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';
import fetchPlanets from '../services/fetchPlanets';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [
    filterByNumericValues,
    setFilterByNumericValues,
  ] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const results = await fetchPlanets();
      setData(results);
      setPrevData(results);
    };
    getPlanets();
  }, []);

  const filterName = (name) => {
    const filter = prevData
      .filter((planet) => planet.name
        .includes(name));
    setData(filter);
    setFilterByName(name);
  };

  const filterNumericValues = (column, comparison, value) => {
    const query = { column, comparison, value };
    const filter = data.filter((planet) => {
      if (query.comparison === 'maior que') return planet[query.column] > +value;
      if (query.comparison === 'menor que') return planet[query.column] < +value;
      if (query.comparison === 'igual a') return planet[query.column] === value;
      return planet;
    });
    setData(filter);
    setFilterByNumericValues([query, ...filterByNumericValues]);
  };

  const object = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filterName,
    filterByNumericValues,
    filterNumericValues,
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
