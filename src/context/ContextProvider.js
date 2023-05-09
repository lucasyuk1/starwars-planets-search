import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import ApiFetch from '../services/fetchApi';

export const URL = 'https://swapi.dev/api/planets';

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterPlanetsByName, setFilterPlanetsByName] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filterByColumn, setFilterByColumn] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const respAPI = await ApiFetch(URL);
      const { results } = respAPI;
      results.forEach((planet) => delete planet.residents);
      setData(results);
    };
    fetchData();
  }, []);

  const context = useMemo(() => ({
    filteredPlanets,
    setFilteredPlanets,
    data,
    setData,
    filterPlanetsByName,
    setFilterPlanetsByName,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    filterByColumn,
    setFilterByColumn,
  }), [data,
    setData,
    filteredPlanets,
    setFilteredPlanets,
    filterPlanetsByName,
    setFilterPlanetsByName,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    filterByColumn,
    setFilterByColumn,
  ]);

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default ContextProvider;
