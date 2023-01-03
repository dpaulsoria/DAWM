import React from 'react';
import Topbar from './components/Topbar.jsx';
import Card from './components/Card.jsx';
import './App.css';

const App = () => {
  return (
    <div>
      <Topbar />
      <Card name="Pikachu" urlImage="cat.png" />
    </div>
  );
};

export default App;
