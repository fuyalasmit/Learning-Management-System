import {  School2 } from 'lucide-react';
import React from 'react';

const Navbar = () => {
  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full p-3"> 
        <div className='flex items-center gap-2' >
          <School2 size={'30'} />
          <h1 className="hidden md:block font-extrabold text-2xl">      E-Learning  </h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
