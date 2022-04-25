import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { planetTableHeaders } from '../data';
import Filters from './Filters';
import styles from '../styles/Table.module.css';

function Table() {
  const { data } = useContext(AppContext);
  return (
    <>
      <Filters />
      <main className={ styles.container }>
        <table className={ styles.table }>
          <thead>
            <tr>
              {planetTableHeaders.map((header) => (
                <th key={ header }>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((planet, index) => (
              <tr key={ `${index}-${planet.name}` }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Table;
