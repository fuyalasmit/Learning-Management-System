import React from 'react';
import { Button } from './components/ui/button';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <main>
      <Navbar/>
      <Login />
    </main>
  );
};

export default App;
