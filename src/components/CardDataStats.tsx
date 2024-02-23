import React, { ReactNode } from 'react';
import up from '.././images/icon/up.svg';
import down from '.././images/icon/down.svg';
interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className=" border border-stroke bg-white py-10 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-2xl">
      <span className="text-sm font-medium text-black">{title}</span>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-xl font-inter font-semibold text-black dark:text-white">
            {total}
          </h4>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && 'text-meta-3'
          } ${levelDown && 'text-meta-5'} `}
        >
          {rate}

          {levelUp && <img src={up} alt="Up arrow" />}
          {levelDown && <img src={down} alt="Down arrow" />}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
