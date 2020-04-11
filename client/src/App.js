import React from 'react';
import './App.css'
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes'
import { UserProvider } from './context/UserContext';

function App() {


  return (
    <UserProvider>

      <Router>
        <Navbar />
        <Routes/>
      </Router>
    </UserProvider>
  );
}

export default App;
