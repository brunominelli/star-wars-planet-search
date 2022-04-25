import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { operators, numericValues } from '../data';
import styles from '../styles/Filters.module.css';

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
    <section className={ styles.container }>
      <form className={ styles.form }>
        <div className={ styles.row }>
          <input
            type="text"
            id="name-filter"
            name="name-filter"
            value={ filterByName.name }
            onChange={ handleChange }
            className={ styles.form_input }
            data-testid="name-filter"
          />
          <select
            data-testid="column-filter"
            value={ column }
            onChange={ (e) => setColumn(e.target.value) }
            className={ styles.form_input }
          >
            {enabledColumns.map((option) => (
              <option key={ option }>{option}</option>
            ))}
          </select>
          <select
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ (e) => setComparison(e.target.value) }
            className={ styles.form_input }
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
            className={ styles.form_input }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => filterNumericValues(column, comparison, value) }
            className={ styles.form_input }
          >
            Filter
          </button>
        </div>
        <div className={ styles.row }>
          <label className={ styles.label } htmlFor="column-sort-input-asc">
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
          <label className={ styles.label } htmlFor="column-sort-input-desc">
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
              className={ styles.form_input }
            >
              {numericValues.map((option) => (
                <option key={ option }>{option}</option>
              ))}
            </select>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ () => sortColumns(sort, columnSort) }
            className={ styles.form_input }
          >
            Order
          </button>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => removeAllFilters() }
            className={ styles.form_input }
          >
            Remove Filters
          </button>
        </div>
      </form>
      <div>
        {filterByNumericValues.map((filter, index) => (
          <div key={ index } className={ styles.row } data-testid="filter">
            <p className={ styles.form_input }>
              { `${filter.column} ${filter.comparison} ${filter.value}` }
            </p>
            <button
              type="button"
              value={ index }
              onClick={ (e) => removeFilter(+e.target.value) }
              className={ styles.form_input }
            >
              X
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Filters;
