import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const { filterByName, filterName } = useContext(AppContext);

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
    </form>
  );
}

export default Filters;
