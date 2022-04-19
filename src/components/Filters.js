import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { operators, optionsNumericValues } from '../data';

function Filters() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [enabledColumns, setEnabledColumns] = useState([...optionsNumericValues]);

  const {
    filterByName,
    filterName,
    filterNumericValues,
    filterByNumericValues,
  } = useContext(AppContext);

  useEffect(() => {
    const columns = filterByNumericValues.map((option) => option.column);
    const filters = optionsNumericValues
      .filter((option) => !columns.includes(option));
    setEnabledColumns(filters);
  }, [filterByNumericValues]);

  const handleChange = ({ target }) => {
    filterName(target.value);
  };

  return (
    <>
      <form>
        <label htmlFor="name-filter">
          <input
            type="text"
            id="name-filter"
            name="name-filter"
            value={ filterByName.name }
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
        <select
          data-testid="column-filter"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
        >
          {enabledColumns.map((option) => (
            <option key={ option }>{option}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ (e) => setComparison(e.target.value) }
        >
          {operators.map((option) => (
            <option key={ option }>{option}</option>
          ))}
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => filterNumericValues(column, comparison, value) }
        >
          Filter
        </button>
      </form>
      <div>
        {filterByNumericValues.map((filter, index) => (
          <p key={ index }>
            { `${filter.column} ${filter.comparison} ${filter.value}` }
          </p>
        ))}
      </div>
    </>
  );
}

export default Filters;
