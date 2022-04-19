import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { planetTableHeaders } from '../data';
import Filters from './Filters';

function Table() {
  const { data } = useContext(AppContext);
  return (
    <>
      <Filters />
      <table>
        <thead>
          <tr>
            {planetTableHeaders.map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
