import React, { useState, useEffect } from 'react';
import CardDataStats from '../components/CardDataStats';
import OfflineBookingTable from '../components/Tables/OfflineBookings';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { ref, onValue } from 'firebase/database';
import { database } from '../main';

interface OnPrkData {
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

interface OffPrkData {
  entryTime: string;
  exitTime: string;
  phoneNo: string;
  vehicleNo: string;
}
const Bookings: React.FC = () => {
  const [offlineBookings, setOfflineBookings] = useState<OffPrkData[]>([]);
  const [onlineBookings, setOnlineBookings] = useState<OnPrkData[]>([]);

  const fetchData = () => {
    const onlineRef = ref(database, '/Parking/parkingEntity/755956/bookings/');
    const offlineRef = ref(
      database,
      '/Parking/parkingEntity/755956/offlineLedger/',
    );

    onValue(onlineRef, (snapshot) => {
      const onData = Object.values(snapshot.val()) as OnPrkData[];
      setOnlineBookings(onData);
    });

    onValue(offlineRef, (snapshot) => {
      const offData = Object.values(snapshot.val()) as OffPrkData[];
      setOfflineBookings(offData);
      console.log(offData);
    });
  };

  const OnnBookings = (data: OnPrkData[]) => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const todayDateStr = `${todayDate}-${todayMonth}-${todayYear}`;
    const todayData = data.filter((item) => {
      const itemDate = new Date(item.timestamp);
      const itemDateStr = `${itemDate.getDate()}-${itemDate.getMonth()}-${itemDate.getFullYear()}`;
      return itemDateStr === todayDateStr;
    });

    return todayData.length;
  };

  const OffBookings = (data: OffPrkData[]) => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const todayDateStr = `${todayDate}-${todayMonth}-${todayYear}`;
    const todayData = data.filter((item) => {
      const itemDate = new Date(item.entryTime);
      const itemDateStr = `${itemDate.getDate()}-${itemDate.getMonth()}-${itemDate.getFullYear()}`;
      return itemDateStr === todayDateStr;
    });

    return todayData.length;
  };

  const OnlineEarning = (data: OnPrkData[]) => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const todayDateStr = `${todayDate}-${todayMonth}-${todayYear}`;
    const todayData = data.filter((item) => {
      const itemDate = new Date(item.timestamp);
      const itemDateStr = `${itemDate.getDate()}-${itemDate.getMonth()}-${itemDate.getFullYear()}`;
      return itemDateStr === todayDateStr;
    });

    return todayData.reduce((acc, item) => {
      return acc + parseFloat(item.amount);
    }, 0);
  };

  const handleOfflinePrice = (data: OffPrkData[]) => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const todayDateStr = `${todayDate}-${todayMonth}-${todayYear}`;
    const todayData = data.filter((item) => {
      const itemDate = new Date(item.entryTime);
      const itemDateStr = `${itemDate.getDate()}-${itemDate.getMonth()}-${itemDate.getFullYear()}`;
      return itemDateStr === todayDateStr;
    });

    return todayData.reduce((acc, item) => {
      return acc + handlePrice(item.entryTime, item.exitTime);
    }, 0);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div className="mt-10 font-inter">
        <Breadcrumb pageName="Overview" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats
            title="Today's Online Bookings"
            total={OnnBookings(onlineBookings).toString()}
            rate="0.43%"
            levelUp
          >
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                fill=""
              />
              <path
                d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                fill=""
              />
            </svg>
          </CardDataStats>
          <CardDataStats
            title="Today's Offline Bookings"
            total={OffBookings(offlineBookings).toString()}
            rate="4.35%"
            levelUp
          >
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
          </CardDataStats>
          <CardDataStats
            title="Today's Online Earnings"
            total={'₹ ' + OnlineEarning(onlineBookings).toString()}
            rate="2.59%"
            levelUp
          >
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                fill=""
              />
              <path
                d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                fill=""
              />
            </svg>
          </CardDataStats>
          <CardDataStats
            title="Today's offline Earning"
            total={'₹ ' + handleOfflinePrice(offlineBookings).toString()}
            rate="0.95%"
            levelDown
          >
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                fill=""
              />
              <path
                d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                fill=""
              />
              <path
                d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                fill=""
              />
            </svg>
          </CardDataStats>
        </div>
      </div>
      <div className="mt-8 mb-8 font-inter font">
        <Breadcrumb pageName="Today's Offline Bookings" />
        <div />
        <div className="flex flex-col gap-10">
          <OfflineBookingTable />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Bookings;
