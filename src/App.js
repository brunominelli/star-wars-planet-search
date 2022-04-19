import React from 'react';
import Table from './components/Table';
import AppProvider from './context/AppProvider';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Table />
    </AppProvider>
  );
}

export default App;
