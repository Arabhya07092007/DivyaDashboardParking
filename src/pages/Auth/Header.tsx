import React from 'react';
import Logo from '../../images/logo/logo.svg';

const Header = () => {
  return (
    <header className="bg-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-12 pb-2 w-20 mr-3" />
          <span className="text-black font-baloo font-bold text-2xl hidden sm:inline">
            दिव्य अयोध्या
          </span>
        </div>
        <h1 className="text-gray-800 text-2xl flex font-bold hidden sm:block">
          Divya Ayodhya Parking Dashboard
        </h1>
        <div className="hidden md:flex items-center">
          <span className="text-gray-600 text-sm opacity-0">
            Your additional text here lorem dolor sit amet
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
