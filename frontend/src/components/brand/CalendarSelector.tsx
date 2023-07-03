import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, DayRange } from "react-modern-calendar-datepicker";
import { BsCalendar3 } from "react-icons/bs";

const CalendarSelector = () => {
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });

  const fromDate =
    selectedDayRange.from &&
    Object.values(selectedDayRange.from)
      .map((date) => date)
      .join("/");

  const toDate =
    selectedDayRange.to &&
    Object.values(selectedDayRange.to)
      .map((date) => date)
      .join("/");

  return (
    <div className="w-[330px]">
      <div className="mb-3  flex rounded-lg bg-collectible-medium-purple py-3">
        <BsCalendar3 className="ml-4 mr-11 mt-1 text-gray-strong" />{" "}
        <div className="flex gap-3 text-sm text-gray-medium">
          <p>{fromDate || "starting date"}</p> -{" "}
          <p>{toDate || "ending date"}</p>
        </div>
      </div>

      <div>
        <Calendar
          value={selectedDayRange}
          onChange={setSelectedDayRange}
          colorPrimary="#7A5FC8"
          calendarClassName="custom-calendar"
          colorPrimaryLight="rgb(122, 95, 200, 0.4)"
          shouldHighlightWeekends
        />
      </div>
    </div>
  );
};

export default CalendarSelector;
