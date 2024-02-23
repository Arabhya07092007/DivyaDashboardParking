import React, { useState } from 'react';
import filter from '../../images/icon/filter.png';

const HotelBtn: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hotels, setHotels] = useState<string[]>([
    'Bhagwati Homestay',
    'Hotel 2',
    'Hotel 3',
    'Hotel 4',
    'Hotel 5',
    'Hotel 6',
    'Hotel 7',
    'Hotel 8',
    'Hotel 9',
    'Hotel 10',
    'Hotel 11',
    'Hotel 12',
  ]);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter hotels based on search term
  const filteredHotels = hotels.filter((hotel) =>
    hotel.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative">
      <button
        className="bg-white text-[#53545C] border px-4 py-2 rounded-md mr-2 flex items-center"
        onClick={handleButtonClick}
      >
        <img src={filter} alt="Filter Icon" className="mr-2" />{' '}
        {/* Add this line */}
        Filter by Hotels
      </button>
      {isDropdownOpen && (
        <div className="absolute top-12 right-2 z-10">
          <div className="bg-[#EAEDFD] p-6 rounded-lg shadow-lg w-115 h-125">
            <h3 className="text-lg text-left font-semibold mb-2">
              Filter By Homestays Name
            </h3>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 h-90 overflow-y-auto">
              <input
                type="text"
                placeholder="Search Homestays"
                className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <ul>
                {filteredHotels.map((hotel, index) => (
                  <li key={index} className="py-2 px-4 flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      // Handle checkbox logic here
                    />
                    {hotel}
                  </li>
                ))}
              </ul>
            </div>
            <button className="bg-[#5570F1] mt-1 text-white px-4 py-2 rounded-xl w-full">
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelBtn;
