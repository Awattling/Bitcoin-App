import React, { Component } from 'react';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import Body from './Components/Body.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Header/>
        <Body/>
        <Footer/>
      </div>
    );
  }
}

export default App;
