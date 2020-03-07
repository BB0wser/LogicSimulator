import React from 'react';
import logo from './circuit.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Logically-logo" alt="logo" />
        <p>
          Welcome to the best logic circuit simulator there is, <code>Logically!</code>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
