import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MonthPicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear();
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;

    return <span title={tooltipText}>{shortMonth}</span>;
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      renderMonthContent={renderMonthContent}
      showMonthYearPicker
      dateFormat="MM/yyyy"
    />
  );
};

export default MonthPicker;
