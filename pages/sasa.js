import React from 'react';
import { format } from 'date-fns';

const DateComponent = () => {
  const date = new Date('2024-09-14T13:00:00');
  
  // Format the date as '14th Sep 2024'
  const formattedDate = format(date, "do MMM yyyy");

  return (
    <div>
      <h1>{formattedDate}</h1>
    </div>
  );
};

export default DateComponent;
