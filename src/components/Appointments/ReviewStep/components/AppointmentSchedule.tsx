import React from "react";
import { Card } from "@/components/ui/card";
import { AppointmentScheduleProps } from "@/types/components/appointmentSchedule";

const AppointmentSchedule = ({
  dates,
  times,
  estimatedEndDate,
  estimatedEndTime,
}: AppointmentScheduleProps) => {
  return (
    <Card className="bg-light-form-bg dark:bg-dark-form-bg border-none p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
          Appointment Schedule
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-light-text/70 dark:text-dark-text/70 mb-2">
            Select A Date
          </p>
          <div className="grid grid-cols-5 gap-2">
            {dates.map((day, index) => (
              <div
                key={index}
                className={`${
                  day.selected
                    ? "bg-light-primary dark:bg-dark-primary text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-light-text dark:text-dark-text"
                } rounded p-3 text-center cursor-pointer transition-colors`}
                onClick={day.onClick}
              >
                <p className="text-sm">{day.day}</p>
                <p className="font-medium">{day.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-light-text/70 dark:text-dark-text/70 mb-2">
            Select A Time
          </p>
          <div className="grid grid-cols-3 gap-2">
            {times.map((slot, index) => (
              <div
                key={index}
                className={`${
                  slot.selected
                    ? "bg-light-primary dark:bg-dark-primary text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-light-text dark:text-dark-text"
                } rounded p-3 text-center cursor-pointer transition-colors`}
                onClick={slot.onClick}
              >
                <p className="text-sm">{slot.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-light-text/70 dark:text-dark-text/70">
            Estimated End Date
          </p>
          <p className="font-medium text-light-text dark:text-dark-text">
            {estimatedEndDate} - {estimatedEndTime}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentSchedule;
