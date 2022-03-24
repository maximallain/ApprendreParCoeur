import React from 'react';
import GuessWordContainer from "./components/GuessWordContainer";
import Header from './components/layout/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <GuessWordContainer />
      </div>
    </div>
  );
}

export default App;
