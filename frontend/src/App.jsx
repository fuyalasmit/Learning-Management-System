import React from 'react';
import { Button } from './components/ui/button';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import HeroSection from './pages/student/HeroSection';

const App = () => {
  return (
    <main>
      <Navbar/>
      {/* <Login /> */}
      <HeroSection/>
    </main>
  );
};

export default App;
