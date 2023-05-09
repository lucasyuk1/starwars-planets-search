import React from 'react';
import './App.css';
import Table from './components/Table';
import ContextProvider from './context/ContextProvider';
import Filters from './components/Filters';

function App() {
  return (
    <ContextProvider>
      <Filters />
      <Table />
    </ContextProvider>
  );
}

export default App;
