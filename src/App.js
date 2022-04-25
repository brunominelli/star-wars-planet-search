import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Table from './components/Table';
import AppProvider from './context/AppProvider';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Header />
      <Table />
      <Footer />
    </AppProvider>
  );
}

export default App;
