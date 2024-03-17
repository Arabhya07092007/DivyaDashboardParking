import React, { useEffect, useState } from 'react';
import packageData from './../Tabledata';
import { ref, onValue } from 'firebase/database';
import { database } from '../../main';
import TableHeaderLabel from './TableHeaderLabel';
import CsvDownloadButton from 'react-json-to-csv';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ParkingData {
  username: string;
  timestamp: string;
  entryTime: string;
  exitTime: string;
  vehicleNo: string;
  amount: string;
  parkingName: string;
  status: boolean;
  phoneNo: string;
  duration: string;
}
const TableThree = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [prkData, setPrkData] = useState<ParkingData[]>([]);

  const fetchData = (searchQuery: string = '') => {
    const dbRef = ref(database, '/Parking/parkingEntity/755956/bookings/');
    onValue(dbRef, (snapshot) => {
      const data = Object.values(snapshot.val()) as ParkingData[];
      const filteredData = data.filter(
        (item) =>
          item.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.username.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setPrkData(filteredData.reverse());
    });
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  const filteredData = prkData.filter(
    (packageItem) =>
      packageItem.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      'Customer Name': string;
      'Vehicle No.': string;
      'Phone No.': string;
      Duration: string;
      'Entry Time': string;
      'Exit Time': string;
      Amount: string;
    }[] = [];
    prkData.map((item, index) => {
      const data = {
        'S.No.': index + 1,
        'Customer Name': item.username,
        'Vehicle No.': handleVehicleNo(item.vehicleNo),
        'Phone No.': '+91 ' + item.phoneNo,
        Duration: item.duration,
        'Entry Time': item.entryTime ? item.entryTime.slice(16, 25) : '--',
        'Exit Time': item.exitTime ? item.exitTime.slice(16, 25) : '--',
        Amount: item.amount,
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

    saveAs(blob, `OnlineBookings_${new Date().toLocaleDateString()}.xlsx`);
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
              placeholder="Search by Name or Vehicle no."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-75 h-9 mb-0 sm:w-75 bg-transparent border border-[#CFD3D5] align-left text-black font-inter focus:outline-none dark:text-white rounded-lg pl-10 pr-3 py-2 text-left"
              // style={{ textAlign: 'left' }}
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
              <th className="py-4 px-0 text-sm font-bold text-black dark:text-white xl:pl-10  w-54  ">
                Customer name
              </th>
              <th className="py-4 px-0 text-sm font-bold text-black dark:text-white xl:pl-7   ">
                Vehicle No.
              </th>
              <TableHeaderLabel label="Phone No." />
              <TableHeaderLabel label="Duration" />
              <TableHeaderLabel label="Entry Time" />
              <TableHeaderLabel label="Exit Time" />
              <TableHeaderLabel label="Amount" />
            </tr>
          </thead>

          <tbody>
            {prkData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#fff] py-3 px-0 pl-3 dark:border-strokedark xl:pl-0 w-12">
                  {' '}
                  <h5 className="font-normal text-sm text-[#6E7079] dark:text-white text-center">
                    {' '}
                    {key + 1}.
                  </h5>
                </td>
                <td className="border-b border-[#fff] py-3 px-0 pl-0 dark:border-strokedark xl:pl-0 w-54">
                  {' '}
                  <h5 className="font-normal text-sm text-[#6E7079] dark:text-white pl-10 ">
                    {' '}
                    {packageItem.username}
                  </h5>
                </td>
                <td className="border-b border-[#fff] py-1 px-0 dark:border-strokedark">
                  {' '}
                  <p className="text-sm text-[#6E7079] dark:text-white pl-5">
                    {' '}
                    {handleVehicleNo(packageItem.vehicleNo)}
                  </p>
                </td>
                <td className="border-b border-[#fff] py-1 px-0 dark:border-strokedark ">
                  {' '}
                  <p className="text-sm text-[#6E7079] dark:text-white text-center">
                    {' '}
                    +91 {packageItem.phoneNo}
                  </p>
                </td>
                <td className="border-b border-[#fff] py-1 px-0 dark:border-strokedark">
                  {' '}
                  <p className="text-sm text-[#6E7079] dark:text-white  text-center ">
                    {' '}
                    {packageItem.duration}
                  </p>
                </td>
                <td className="border-b border-[#fff] py-1 px-0 dark:border-strokedark ">
                  {' '}
                  <p className="text-sm text-[#6E7079] dark:text-white text-center ">
                    {' '}
                    {packageItem.entryTime
                      ? packageItem.entryTime.slice(16, 25)
                      : '--'}
                  </p>
                </td>
                <td className="border-b border-[#fff] py-1 px-0 dark:border-strokedark">
                  {' '}
                  <p className="text-sm text-[#6E7079] dark:text-white text-center">
                    {' '}
                    {packageItem.exitTime
                      ? packageItem.exitTime.slice(16, 25)
                      : '--'}
                  </p>
                </td>
                <td className="border-b border-[#fff] py-1 px-0 dark:border-strokedark">
                  {' '}
                  <p className="text-sm text-[#6E7079] dark:text-white text-center">
                    {' '}
                    {packageItem.amount}
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

export default TableThree;

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
