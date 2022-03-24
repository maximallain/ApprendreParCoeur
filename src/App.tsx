import React from 'react';
import logo from './assets/logo.svg';
import './global/styles.css';
import GuessWordContainer from "./components/GuessWordContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>ApprendreParCoeur.com</h1>
      </header>
      <div>
        <GuessWordContainer />
      </div>
    </div>
  );
}

export default App;
