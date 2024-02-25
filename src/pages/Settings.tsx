import React, { useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import bgimage from '../images/bgimg.svg';
import { database } from '../main';
import { ref, set, child, get } from 'firebase/database';

const Settings: React.FC = () => {
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [vehicleNumberError, setVehicleNumberError] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleNumber(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!vehicleNumber) {
      setVehicleNumberError('Vehicle number is required');
    } else {
      // handleCheck(vehicleNumber);
      console.log('this is handle check', handleCheck(vehicleNumber));
      if (handleCheck(vehicleNumber)) {
        alert('Vehicle number already exists in offline entries');
      } else {
        alert('Vehicle number does not exist in offline entries');
      }

      // console.log(vehicleNumber);
      setVehicleNumberError('');
      setVehicleNumber('');
    }
  };

  const handleCheck = (vehicleNo: string): boolean => {
    const dbRef = ref(database);
    const prkEnt = '755956';

    get(
      child(
        dbRef,
        `/Parking/parkingEntity/${prkEnt}/offlineEntries/${vehicleNo}`,
      ),
    ).then((snapshot) => {
      // console.log('Checking for vehicle number in offline entries');
      // console.log(snapshot.exists());
      if (snapshot.val() !== null) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <DefaultLayout>
      <div className="bg-white rounded-lg p-0 ">
        <h1 className="text-4xl font-bold text-black  text-center mb-[-20px] pt-10">
          Enter Vehicle Details
        </h1>
        <div className="flex justify-center items-center mb-[-40px]">
          {/* Left: Image */}
          <div className="w-3/5 h-screen hidden lg:block">
            <img
              src={bgimage}
              alt="Placeholder Image"
              className="object-contain w-full h-full"
            />
          </div>

          {/* Right:  Form */}
          <div className="lg:p-0 lg:m-10 md:p-52 sm:20 p-8 w-full lg:w-3/5">
            <form
              onSubmit={handleSubmit}
              className="border border-yellow-500 rounded-xl p-8"
            >
              <h1 className="text-2xl font-semibold mb-4">
                Offline Details Input
              </h1>
              {/* Username Input */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600">
                  Customer Name (optional)
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
              </div>
              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">
                  Phone Number (optional)
                </label>
                <input
                  type="tel" // Change the type to "tel"
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
              </div>

              {/* Vehicle Number Input */}
              <div className="mb-4">
                <label htmlFor="vehicleNumber" className="block text-gray-600">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={vehicleNumber}
                  onChange={handleInputChange}
                  maxLength={10}
                  minLength={9}
                  className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
                    vehicleNumberError ? 'border-red-500' : ''
                  }`}
                  autoComplete="off"
                  // autoCapitalize="characters"
                />
                {vehicleNumberError && (
                  <p className="text-red-500 text-sm mt-1">
                    {vehicleNumberError}
                  </p>
                )}
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md py-2 mt-6 mb-8 px-4 w-full"
              >
                Submit
              </button>
            </form>
            {/* Sign up  Link */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
