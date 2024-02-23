import React from 'react';

interface Props {
  label: string;
}

const TableElement: React.FC<Props> = ({ label }) => {
  return (
    <th className="py-4 px-4 text-sm font-bold text-black dark:text-white xl:pl-1">
      {label}
    </th>
  );
};

export default TableElement;
