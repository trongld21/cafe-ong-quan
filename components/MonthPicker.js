import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

const MonthPicker = ({ selectedDate, onDateChange }) => {
  const selectedDay = dayjs(selectedDate);

  const handleChange = (date) => {
    const formattedDate = dayjs(date).format('MM/YYYY');
    onDateChange(formattedDate);
  };

  return (
    <DatePicker
      selected={selectedDay.toDate()}
      onChange={handleChange}
      showMonthYearPicker
      dateFormat="MM/yyyy"
    />
  );
};

export default MonthPicker;
