import React from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  console.log("got here")
  return (
    <div className="App">
      <header className="App-header">
        <h2>Hello welcome!</h2>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Oauth Authentication
        </a>
        <a href='/auth/google'> Sign in using google oauth</a>
      </header>
    </div>
  );
}

export default App;
