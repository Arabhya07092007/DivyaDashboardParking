import React from 'react';

interface Props {
  label: string;
}

const TableHeaderLabel: React.FC<Props> = ({ label }) => {
  return (
    <th className="py-4 px-0 text-sm font-bold text-black dark:text-white xl:pl-0   text-center">
      {label}
    </th>
  );
};

export default TableHeaderLabel;
