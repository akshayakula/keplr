import React, { useState } from "react";
import "./styles.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyDatePicker() {
  const [date, setDate] = useState(new Date());
  const handleChange = date => setDate(date);

  return <DatePicker selected={date} onChange={handleChange} />;
}
