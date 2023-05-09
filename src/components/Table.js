import React, { useContext, useEffect } from 'react';
import dataApi from '../context/PlanetsContext';
import Header from './Header';

function Table() {
  const { filterPlanetsByName,
    filterByColumn,
    column,
    value,
    filteredPlanets,
    setFilteredPlanets,
  } = useContext(dataApi);

  useEffect(() => {
    const filterByNameResults = filterPlanetsByName;
    const filterByColumnResults = filterByColumn;

    if (filterByColumnResults.length > 0) {
      setFilteredPlanets(filterByColumnResults);
    } else {
      setFilteredPlanets(filterByNameResults);
    }
  }, [filterPlanetsByName, filterByColumn, column, value, setFilteredPlanets]);

  return (
    <div>
      <table>
        <Header />
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
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
    </div>
  );
}

export default Table;
