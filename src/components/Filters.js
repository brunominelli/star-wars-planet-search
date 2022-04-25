import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { operators, numericValues } from '../data';

function Filters() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [enabledColumns, setEnabledColumns] = useState([...numericValues]);
  const [sort, setSort] = useState('ASC');
  const [columnSort, setColumnSort] = useState('population');

  const {
    filterByName,
    filterName,
    filterNumericValues,
    filterByNumericValues,
    sortColumns,
    removeFilter,
    removeAllFilters,
  } = useContext(AppContext);

  useEffect(() => {
    const columns = filterByNumericValues.map((option) => option.column);
    const filters = numericValues
      .filter((option) => !columns.includes(option));
    setEnabledColumns(filters);
  }, [filterByNumericValues]);

  const handleChange = ({ target }) => {
    filterName(target.value);
  };

  return (
    <>
      <form>
        <div className="row">
          <input
            type="text"
            id="name-filter"
            name="name-filter"
            value={ filterByName.name }
            onChange={ handleChange }
            data-testid="name-filter"
          />
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
        </div>
        <div className="row">
          <label htmlFor="column-sort-input-asc">
            <span>Ascending</span>
            <input
              type="radio"
              value="ASC"
              id="column-sort-input-asc"
              name="column-sort"
              data-testid="column-sort-input-asc"
              defaultChecked
              onClick={ (e) => setSort(e.target.value) }
            />
          </label>
          <label htmlFor="column-sort-input-desc">
            <span>Descendant</span>
            <input
              type="radio"
              value="DESC"
              id="column-sort-input-desc"
              name="column-sort"
              data-testid="column-sort-input-desc"
              onClick={ (e) => setSort(e.target.value) }
            />
          </label>
          <span>Order</span>
          <select
            id="column-sort"
            data-testid="column-sort"
            onChange={ (e) => setColumnSort(e.target.value) }
          >
            {numericValues.map((option) => (
              <option key={ option }>{option}</option>
            ))}
          </select>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ () => sortColumns(sort, columnSort) }
          >
            Order
          </button>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => removeAllFilters() }
          >
            Remove Filters
          </button>
        </div>
      </form>
      <div>
        {filterByNumericValues.map((filter, index) => (
          <div key={ index } className="row" data-testid="filter">
            <p>
              { `${filter.column} ${filter.comparison} ${filter.value}` }
            </p>
            <button
              type="button"
              value={ index }
              onClick={ (e) => removeFilter(+e.target.value) }
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Filters;
