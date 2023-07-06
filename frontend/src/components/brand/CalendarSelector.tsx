import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  Calendar,
  DayRange,
} from "@amir04lm26/react-modern-calendar-date-picker";
import { BsCalendar3 } from "react-icons/bs";

const CalendarSelector = ({
  dateRange,
  onSelectDateRange,
}: {
  dateRange: DayRange;
  onSelectDateRange: React.Dispatch<React.SetStateAction<DayRange>>;
}) => {
  const [isDatePickerVIsible, setIsDatePickerVisible] = useState(false);

  const fromDate =
    dateRange.from &&
    Object.values(dateRange.from)
      .map((date) => date)
      .join("/");

  const toDate =
    dateRange.to &&
    Object.values(dateRange.to)
      .map((date) => date)
      .join("/");

  const handleDatePickerCalendar = () => {
    setIsDatePickerVisible((prev) => !prev);
  };

  return (
    <div className="w-[330px]">
      <div
        onClick={handleDatePickerCalendar}
        className="mb-3  flex rounded-lg bg-collectible-medium-purple py-4 hover:cursor-pointer"
      >
        <BsCalendar3 className="ml-4 mr-11 mt-0.5 text-gray-strong" />{" "}
        <div className="flex gap-3 text-sm text-gray-medium">
          <p>{fromDate || "starting date"}</p> -{" "}
          <p>{toDate || "ending date"}</p>
        </div>
      </div>

      {isDatePickerVIsible && (
        <Calendar
          value={dateRange}
          onChange={onSelectDateRange}
          colorPrimary="#7A5FC8"
          calendarClassName="custom-calendar"
          colorPrimaryLight="rgb(122, 95, 200, 0.4)"
          shouldHighlightWeekends
        />
      )}
    </div>
  );
};

export default CalendarSelector;
