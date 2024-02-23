import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Calendar from '../../images/icon/calendar.svg';

const DateFilterBtn: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isFromSelected, setIsFromSelected] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr);
  };

  const handleFromToSwitch = () => {
    setIsFromSelected(!isFromSelected);
  };

  return (
    <div className="relative">
      <button
        className="bg-white text-[#53545C] border px-4 py-2 rounded-md mr-2 flex items-center"
        onClick={handleButtonClick}
      >
        <img src={Calendar} alt="Calendar" className="mr-2" />
        <span className="text-base font-normal">Filter by Date</span>
      </button>
      {isDropdownOpen && (
        <div className="absolute top-12 right-2 z-10">
          <div className="bg-white rounded-lg shadow-lg w-100">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">By Date</h3>
              {/* Filters by days, weeks, months, and last date, week, month */}
              <div className="grid grid-cols-2 font-inter text-[#83898C] text-sm gap-x-4 mb-4">
                <div className="flex flex-col">
                  <label className="inline-flex items-center mb-2">
                    <input type="checkbox" className="mr-2" />
                    This Day
                  </label>
                  <label className="inline-flex items-center mb-2">
                    <input type="checkbox" className="mr-2" />
                    This Week
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="mr-2" />
                    This Month
                  </label>
                </div>
                <div className="flex flex-col">
                  <label className="inline-flex items-center mb-2">
                    <input type="checkbox" className="mr-2" />
                    Last Day
                  </label>
                  <label className="inline-flex items-center mb-2">
                    <input type="checkbox" className="mr-2" />
                    Last Week
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Last Month
                  </label>
                </div>
              </div>
              {/* Title for date selection */}
              <h4 className="text-lg font-semibold mb-2 text-left">
                <input type="checkbox" className="mr-2 rounded-lg" />
                Date Range
              </h4>
              <div className="flex items-center mb-4">
                <button
                  className={`px-4 py-2 border rounded-full mr-4 ${
                    isFromSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={handleFromToSwitch}
                >
                  From
                </button>
                <button
                  className={`px-4 py-2 border rounded-full ${
                    !isFromSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={handleFromToSwitch}
                >
                  To
                </button>
              </div>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
              />
            </div>
            <button className="bg-[#5570F1] text-white px-4 py-2 rounded-xl w-80 mt-2 mb-4">
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilterBtn;
