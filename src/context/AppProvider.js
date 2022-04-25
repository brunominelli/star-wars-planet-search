import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';
import fetchPlanets from '../services/fetchPlanets';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [order, setOrder] = useState({ sort: 'ASC', column: 'name' });
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [
    filterByNumericValues,
    setFilterByNumericValues,
  ] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const results = await fetchPlanets();
      // Referência: https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a#:~:text=Aprenda%20como%20usar%20o%20m%C3%A9todo,de%20n%C3%BAmeros%2C%20strings%20e%20objetos.&text=O%20m%C3%A9todo%20sort()%20permite,dos%20elementos%20no%20array%20original.
      const alphabeticData = results.sort((x, y) => {
        const a = x.name;
        const b = y.name;
        let ordenation = 1;
        if (a === b) {
          ordenation = 0;
        } else if (a > b) {
          ordenation = 1;
        } else return -ordenation;
        return ordenation;
      });
      setData(alphabeticData);
      setPrevData(alphabeticData);
    };
    getPlanets();
  }, []);

  const filterName = (name) => {
    const filter = prevData
      .filter((planet) => planet.name.toLowerCase()
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
    setFilterByNumericValues([...filterByNumericValues, query]);
  };

  const sortColumns = (sort, column) => {
    const object = { sort, column };
    let unknownResult = [];
    let numericResult = [];
    let result = [];

    switch (sort) {
    case 'ASC':
      unknownResult = data.filter((planet) => planet[column] === 'unknown');
      numericResult = data.filter((planet) => planet[column] !== 'unknown')
        .sort((a, b) => +a[column] - +b[column]);
      result = [...numericResult, ...unknownResult];
      setData(result);
      break;
    case 'DESC':
      unknownResult = data.filter((planet) => planet[column] === 'unknown');
      numericResult = data.filter((planet) => planet[column] !== 'unknown')
        .sort((a, b) => +b[column] - +a[column]);
      result = [...numericResult, ...unknownResult];
      setData(result);
      break;
    default:
      break;
    }
    setOrder(object);
  };

  const removeFilter = (id) => {
    const filters = filterByNumericValues
      .filter((filter) => filter !== filterByNumericValues[id]);

    if (filters.length === 0) {
      setData(prevData);
      setFilterByNumericValues(filters);
    }

    if (filters.length > 0) {
      filters.forEach(({ column, comparison, value }) => {
        const filter = prevData.filter((planet) => {
          if (comparison === 'maior que') return planet[column] > +value;
          if (comparison === 'menor que') return planet[column] < +value;
          if (comparison === 'igual a') return planet[column] === value;
          return planet;
        });
        setData(filter);
      });
      setFilterByNumericValues(filters);
    }
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setData(prevData);
  };

  const object = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filterName,
    filterByNumericValues,
    filterNumericValues,
    order,
    sortColumns,
    removeFilter,
    removeAllFilters,
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
