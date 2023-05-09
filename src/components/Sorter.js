import React, { useContext, useState } from 'react';
import OPTS_COLUMN from '../helpers/opt';
import PlanetsContext from '../context/PlanetsContext';

function Sorter() {
  const { data, setData } = useContext(PlanetsContext);
  const [columnSortOptions, setColumnSortOptions] = useState(OPTS_COLUMN[0].value);
  const [sortOptions, setSortOptions] = useState('');

  const handleColumn = ({ target }) => {
    setColumnSortOptions(target.value);
  };

  const handleOrder = ({ target }) => {
    setSortOptions(target.value);
  };

  const handleBtnSort = () => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // https://stackoverflow.com/questions/29829205/sort-an-array-so-that-null-values-always-come-last
    const sorterData = [...data];
    if (sortOptions === 'ASC') {
      sorterData.sort((a, b) => {
        const unknown = -1;
        if (b[columnSortOptions] === 'unknown') return unknown;
        return a[columnSortOptions] - b[columnSortOptions];
      });
      setData(sorterData);
    } else if (sortOptions === 'DESC') {
      sorterData.sort((a, b) => b[columnSortOptions] - a[columnSortOptions]);
      setData(sorterData);
    }
  };

  return (
    <div className="sort-container">
      <select
        onChange={ (e) => handleColumn(e) }
        className="sorter-select"
        data-testid="column-sort"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <label htmlFor="sortAsc" className="sorter">
        Ascedente
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          id="sortAsc"
          name="sortAsc"
          value="ASC"
          onChange={ (e) => handleOrder(e) }
        />
      </label>
      <label htmlFor="sortDesc" className="sorter">
        Descedente
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          id="sortDesc"
          name="sortDesc"
          value="DESC"
          onChange={ (e) => handleOrder(e) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        name="sort"
        className="sorter-btn"
        onClick={ handleBtnSort }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Sorter;
