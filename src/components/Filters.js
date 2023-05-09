import React, { useContext, useState, useEffect, useCallback } from 'react';
import dataApi from '../context/PlanetsContext';
import Sorter from './Sorter';
import OPTS_COLUMN from '../helpers/opt';

function Filters() {
  const [searchByName, setSearchByName] = useState('');
  const [filterByColumnData, setFilterByColumnData] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState([]);
  const [removedFilterOptions, setRemovedFilterOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState(OPTS_COLUMN);

  const { data,
    setColumn,
    column,
    comparison,
    setComparison,
    value,
    setValue,
    setFilterByColumn,
  } = useContext(dataApi);

  const filtredByColumn = useCallback(() => {
    let newData = [];
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number
    if (comparison === 'maior que') {
      newData = data.filter((planet) => Number(planet[column]) > Number(value));
    } else if (comparison === 'menor que') {
      newData = data.filter((planet) => Number(planet[column]) < Number(value));
    } else if (comparison === 'igual a') {
      newData = data.filter((planet) => Number(planet[column]) === Number(value));
    }
    setFilterByColumnData(
      (prevData) => [...prevData, {
        column, comparison, value, data: newData }],
    );
    setFilterOptions(
      (prevOpt) => prevOpt.filter((opt) => {
        console.log('option.value', opt);
        return opt.value !== column;
      }),
    );
    setFiltersApplied([...filtersApplied, { column, comparison, value }]);
  }, [comparison,
    column,
    value,
    data,
    setFilterByColumnData,
    setFilterOptions,
    filtersApplied,
  ]);

  const removeFilter = (filter) => {
    // Essa thread me deu uma luz para conseguir resolver esse requisito https://stackoverflow.com/questions/37385299/filter-and-delete-filtered-elements-in-an-array
    const { column: filterColumn, value: filterValue } = filter;
    console.log('filterColumn', filterColumn);
    setFilterOptions((prevOpt) => {
      if (prevOpt.some((opt) => opt.value === filter.column)) {
        return prevOpt;
      }
      setFilterByColumnData(
        (prevData) => prevData.filter((aData) => aData.column !== filterColumn),
      );
      setFiltersApplied(
        (prevFilters) => prevFilters.filter(
          (prevFilter) => prevFilter.column !== filterColumn,
        ),
      );
      const newFilterOptions = [
        ...prevOpt,
        { value: filterColumn, label: filterColumn },
      ];
      setRemovedFilterOptions(
        (prevRemovedFilterOptions) => prevRemovedFilterOptions.filter(
          (opt) => opt.value !== filterColumn && opt.value !== filterValue,
        ),
      );

      return newFilterOptions;
    });
  };

  const clearAllFilters = () => {
    setFilterOptions([
      { value: 'population', label: 'population' },
      { value: 'orbital_period', label: 'orbital_period' },
      { value: 'diameter', label: 'diameter' },
      { value: 'rotation_period', label: 'rotation_period' },
      { value: 'surface_water', label: 'surface_water' },
    ]);
    setFilterByColumnData([]);
    setFiltersApplied([]);
    setRemovedFilterOptions([]);
  };

  useEffect(() => {
    setColumn(filterOptions[0].value);
    let filteredData = data;
    if (searchByName) {
      filteredData = filteredData.filter(
        (planet) => planet.name.toLowerCase().includes(searchByName.toLowerCase()),
      );
    }

    filterByColumnData.forEach((filter) => {
      const { data: filterData } = filter;
      if (filterData.length > 0) {
        if (filter.comparison === 'maior que') {
          filteredData = filteredData.filter(
            (planet) => Number(planet[filter.column]) > Number(filter.value),
          );
        } else if (filter.comparison === 'menor que') {
          filteredData = filteredData.filter(
            (planet) => Number(planet[filter.column]) < Number(filter.value),
          );
        } else if (filter.comparison === 'igual a') {
          filteredData = filteredData.filter(
            (planet) => Number(planet[filter.column]) === Number(filter.value),
          );
        }
      }
    });
    setFilterByColumn(filteredData);
  }, [searchByName,
    filterByColumnData,
    data,
    setFilterByColumn,
    setColumn,
    filterOptions,
  ]);

  return (
    <>
      <img src="https://imgur.com/GzPy9yk.png" alt="Star Wars" className="logo-starwars" />
      <div className="filters-container">
        <label htmlFor="filter" className="filter">
          Filtrar por nome:
          <input
            type="text"
            name="filter"
            data-testid="name-filter"
            value={ searchByName }
            onChange={ (e) => setSearchByName(e.target.value) }
          />
        </label>
        <label htmlFor="filter" className="filter">
          Filtrar por coluna:
          <select
            data-testid="column-filter"
            value={ column }
            onChange={ (e) => setColumn(e.target.value) }
          >
            {filterOptions.map((option) => (
              <option key={ option.value } value={ option.value }>
                {option.label}
              </option>

            ))}
            {removedFilterOptions.map((option) => (
              <option key={ option.value } value={ option.value }>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="filter" className="filter">
          Operador:
          <select
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ (e) => setComparison(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="filter" className="filter">
          Valor:
          <input
            type="number"
            name="filter"
            data-testid="value-filter"
            min={ 0 }
            value={ value }
            onChange={ (e) => setValue(e.target.value) }
          />
        </label>
      </div>
      <div className="buttons-container">
        <button
          type="button"
          className="button-filter"
          data-testid="button-filter"
          onClick={ () => filtredByColumn() }
        >
          Filtrar
        </button>
        <button
          type="button"
          className="button-remove-filters"
          data-testid="button-remove-filters"
          onClick={ () => { clearAllFilters(); } }
        >
          Limpar filtros
        </button>
      </div>
      <div className="filters-applied-container">
        {filtersApplied.length > 0 && (
          <div>
            {filtersApplied.map((filter) => (
              <div data-testid="filter" className="filter-applied" key={ filter.column }>
                <span>{filter.column}</span>
                {' '}
                <span>{filter.comparison}</span>
                {' '}
                <span>{filter.value}</span>
                {' '}
                <button
                  type="button"
                  className="remove-filter-button"
                  onClick={ () => { removeFilter(filter); } }
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Sorter />
    </>
  );
}

export default Filters;
