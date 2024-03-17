import React, { useEffect, useState } from 'react';
import packageData from './../Tabledata';
import { ref, onValue } from 'firebase/database';
import { database } from '../../main';
import TableHeaderLabel from './TableHeaderLabel';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ParkingData {
  name: string;
  entryTime: string;
  exitTime: string;
  phoneNo: string;
  vehicleNo: string;
  refId: string;
}
const OfflineBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [prkData, setPrkData] = useState<ParkingData[]>([]);

  const fetchData = (searchQuery: string = '') => {
    const dbRef = ref(database, '/Parking/parkingEntity/755956/offlineLedger/');
    onValue(dbRef, (snapshot) => {
      const data = Object.values(snapshot.val()).reverse() as ParkingData[]; // Type assertion

      const filteredData = data.filter((item) =>
        item.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      setPrkData(filteredData);
    });
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  const handleDuration = (entryTime: string, exitTime: string): string => {
    if (exitTime) {
      let entry = new Date(entryTime);
      let exit = new Date(exitTime);
      let duration = (
        Math.abs(exit.getTime() - entry.getTime()) / 36e5
      ).toFixed();

      return duration;
    } else {
      return '--';
    }
  };

  const handlePrice = (entryTime: string, exitTime: string): number => {
    console.log(entryTime, exitTime);
    if (exitTime) {
      let entry = new Date(entryTime);
      let exit = new Date(exitTime);
      let duration = (
        Math.abs(exit.getTime() - entry.getTime()) / 36e5
      ).toFixed();

      if (Number(duration) <= 4) {
        return 50;
      } else if (Number(duration) > 4 && Number(duration) <= 8) {
        return 70;
      } else {
        return 110;
      }
    } else {
      return 0;
    }
  };

  // Filtering logic based on search term
  const filteredData = prkData.filter((packageItem) =>
    packageItem.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleVehicleNo = (vehicleNo: string): string => {
    let gadiSankhya = vehicleNo.toUpperCase();
    if (vehicleNo.length == 10) {
      return (
        gadiSankhya.slice(0, 2) +
        ' ' +
        gadiSankhya.slice(2, 4) +
        ' ' +
        gadiSankhya.slice(4, 6) +
        ' ' +
        gadiSankhya.slice(6, 10)
      );
    } else {
      return (
        gadiSankhya.slice(0, 2) +
        ' ' +
        gadiSankhya.slice(2, 4) +
        ' ' +
        gadiSankhya.slice(4, 5) +
        ' ' +
        gadiSankhya.slice(5, 9)
      );
    }
  };

  const exportToExcel = () => {
    console.log(prkData);

    let excelData: {
      'S.No.': number;
      'Vehicle No.': string;
      Duration: string;
      'Entry Time': string;
      'Exit Time': string;
      Amount: string;
      'Ticket ID': string;
    }[] = [];
    prkData.map((item, index) => {
      const data = {
        'S.No.': index + 1,
        'Vehicle No.': handleVehicleNo(item.vehicleNo),
        Duration: handleDuration(item.entryTime, item.exitTime),
        'Entry Time': item.entryTime ? item.entryTime.slice(16, 25) : '--',
        'Exit Time': item.exitTime ? item.exitTime.slice(16, 25) : '--',
        Amount: `${handlePrice(item.entryTime, item.exitTime)}`,
        'Ticket ID': item.refId,
      };

      console.log(data);

      excelData.push(data);
    });

    console.log(excelData);

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(blob, `OfflineBookings_${new Date().toLocaleDateString()}.xlsx`);
  };

  return (
    <div className="rounded-xl border border-stroke bg-[white] px-5 pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold mb-0">Booking Details</h2>
        {/* Search box */}
        <div className="flex">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search by Vehicle No."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-40 h-9 mb-0 sm:w-60 bg-transparent border border-[#CFD3D5] align-left text-black font-inter focus:outline-none dark:text-white rounded-lg pl-10 pr-3 py-2 text-left"
            />
            <svg
              className="absolute left-1 top-4.5 -translate-y-1/2 fill-body dark:fill-bodydark"
              width="40"
              height="20"
              viewBox="0 0 20 20"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                fill=""
              />
            </svg>
          </div>

          <button onClick={exportToExcel} style={styles.downloadButton}>
            Download Data
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full h-auto table-auto">
          <thead>
            <tr className=" border-b border-t  border-[#CFD3D5] text-left ">
              <th className="py-4 px-0 text-sm font-bold text-black dark:text-white xl:pl-0  w-12 text-center ">
                S.No.
              </th>
              <TableHeaderLabel label="Vehicle No." />
              <TableHeaderLabel label="Entry Time" />
              <TableHeaderLabel label="Exit Time" />
              <TableHeaderLabel label="Duration" />
              <TableHeaderLabel label="Amount" />
              <TableHeaderLabel label="Ticket ID" />
            </tr>
          </thead>

          <tbody>
            {prkData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#fff] py-3 px-0 dark:border-strokedark xl:pl-0 w-12 ">
                  <h5 className="font-normal text-sm text-[#6E7079] dark:text-white text-center">
                    {key + 1}.
                  </h5>
                </td>
                <td className="border-b border-[#fff] py-3 px-0 dark:border-strokedark xl:pl-0 w-54  ">
                  <h5 className="font-normal text-sm text-[#6E7079] dark:text-white text-center">
                    {handleVehicleNo(packageItem.vehicleNo)}
                  </h5>
                </td>
                <td className="border-b border-[#fff] py-3 px-0 dark:border-strokedark xl:pl-0 w-54 text-center">
                  <h5 className="font-normal text-sm text-[#6E7079] dark:text-white ">
                    {packageItem.entryTime
                      ? packageItem.entryTime.slice(16, 25)
                      : '--'}
                  </h5>
                </td>
                <td className="border-b border-[#fff] py-1 px-0 dark:border-strokedark">
                  <p className="text-sm text-[#6E7079] dark:text-white text-center">
                    {packageItem.exitTime
                      ? packageItem.exitTime.slice(16, 25)
                      : '--'}
                  </p>
                </td>
                <td className="border-b border-[#fff] py-1 px-0 dark:border-strokedark">
                  <p className="text-sm text-[#6E7079] dark:text-white  text-center">
                    {handleDuration(
                      packageItem.entryTime,
                      packageItem.exitTime,
                    )}
                  </p>
                </td>
                <td className="border-b border-[#fff] py-1 px-0 dark:border-strokedark ">
                  <p className="text-sm text-[#6E7079] dark:text-white pl-0  text-center  ">
                    {handlePrice(packageItem.entryTime, packageItem.exitTime)}
                  </p>
                </td>
                <td className="border-b border-[#fff] py-1 px-0 dark:border-strokedark ">
                  <p className="text-sm text-[#6E7079] dark:text-white pl-0  text-center  ">
                    {packageItem.refId}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfflineBookings;

const styles = {
  downloadButton: {
    boxShadow: 'inset 0px 1px 0px 0px #e184f3',
    background: 'linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)',
    backgroundColor: '#c123de',
    borderRadius: '6px',
    border: '1px solid #a511c0',
    display: 'inline-block',
    cursor: 'pointer',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 'bold',
    padding: '6px 24px',
    textDecoration: 'none',
    textShadow: '0px 1px 0px #9b14b3',
    margin: '0 0 0 10px',
  },
};
