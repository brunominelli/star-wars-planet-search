import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { operators, optionsNumericValues } from '../data';

function Filters() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const { filterByName, filterName, filterNumericValues } = useContext(AppContext);

  const handleChange = ({ target }) => {
    filterName(target.value);
  };

  return (
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
        {optionsNumericValues.map((option) => (
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
  );
}

export default Filters;
