import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Navigation />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
