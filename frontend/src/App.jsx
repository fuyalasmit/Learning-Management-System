import React from 'react';
import { Button } from './components/ui/button';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import HeroSection from './pages/student/HeroSection';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import { RouterProvider } from 'react-router';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <HeroSection />
            {/* <Course/> */}
          </>
        ),
      },
      {
        path:"/login",
        element:<Login/>
      }
    ],
  },
]);
const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
};

export default App;
