import FooterAction from "@/components/FooterAction";
import { Button } from "@/components/ui/button";
import { FooterActionPlacement } from "@/enums";
import { useAppointmentStore } from "@/store/appointment-store";
import { useEffect, useState } from "react";
import AppointmentSchedule from "./components/AppointmentSchedule";
import ClientInfo from "./components/ClientInfo";
import ServicesList from "./components/ServicesList";
import { ReviewStepProps } from "@/types/components/reviewStep";

const ReviewStep = ({ onPrevious, onSubmit }: ReviewStepProps) => {
  const {
    contact,
    vehicleYear,
    vehicleMake,
    vehicleModel,
    vehicleType,
    vehicleYearManual,
    vehicleMakeManual,
    vehicleModelManual,
    vehicleTypeManual,
    isManual,
    selectedPackages,
    setCurrentStep,
    selectedDate,
    selectedTime,
    estimatedEndDate,
    estimatedEndTime,
    setSelectedDate,
    setSelectedTime,
    setEstimatedEndDate,
    setEstimatedEndTime,
  } = useAppointmentStore();

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate("Jan 2024");
    }
    if (!selectedTime) {
      setSelectedTime("09:00 AM");
    }
    if (!estimatedEndDate) {
      setEstimatedEndDate("January 20, 2025");
    }
    if (!estimatedEndTime) {
      setEstimatedEndTime("4:00 PM");
    }
  }, [
    selectedDate,
    selectedTime,
    estimatedEndDate,
    estimatedEndTime,
    setSelectedDate,
    setSelectedTime,
    setEstimatedEndDate,
    setEstimatedEndTime,
  ]);

  const [selectedDateIndex, setSelectedDateIndex] = useState(1);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(1);

  const year = isManual ? vehicleYearManual : vehicleYear;
  const make = isManual ? vehicleMakeManual : vehicleMake;
  const model = isManual ? vehicleModelManual : vehicleModel;
  const type = isManual ? vehicleTypeManual : vehicleType;

  const timeOptions = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "13:00 PM",
    "14:00 PM",
    "15:00 PM",
    "16:00 PM",
    "17:00 PM",
  ];

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const handleTimeSelection = (index: number) => {
    setSelectedTimeIndex(index);
    setSelectedTime(timeOptions[index]);

    const selectedHour = parseInt(timeOptions[index].split(":")[0]);
    const endHour = selectedHour + 7;
    const endTime = `${endHour > 12 ? endHour - 12 : endHour}:00 ${
      endHour >= 12 ? "PM" : "AM"
    }`;
    setEstimatedEndTime(endTime);
  };

  const handleDateSelection = (index: number) => {
    setSelectedDateIndex(index);
    setSelectedDate(`Jan ${index + 6}, 2024`);
  };

  const daysOfWeek = dayLabels.map((day, index) => ({
    day,
    date: index + 6,
    selected: selectedDateIndex === index,
    onClick: () => handleDateSelection(index),
  }));

  const timeSlots = timeOptions.map((time, index) => ({
    time,
    selected: selectedTimeIndex === index,
    onClick: () => handleTimeSelection(index),
  }));

  const handleEditClientInfo = () => {
    setCurrentStep(1);
  };

  const handleEditServices = () => {
    setCurrentStep(2);
  };

  const handleSendAppointment = () => {
    onSubmit();
  };

  if (!contact) {
    return (
      <div className="flex items-center justify-center h-64 bg-light-form-bg dark:bg-dark-form-bg border border-border rounded-lg shadow-sm">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2 text-light-text dark:text-dark-text">
            No contact selected
          </h3>
          <Button
            onClick={() => setCurrentStep(1)}
            variant="outline"
            className="bg-transparent hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 border border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary"
          >
            Go back to step 1
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ClientInfo
        contact={contact}
        vehicleDetails={{
          year,
          make,
          model,
          type,
        }}
        onEdit={handleEditClientInfo}
      />

      <AppointmentSchedule
        dates={daysOfWeek}
        times={timeSlots}
        estimatedEndDate={estimatedEndDate}
        estimatedEndTime={estimatedEndTime}
      />

      <ServicesList
        services={selectedPackages}
        dateInfo={{
          startDate: selectedDate,
          endDate: estimatedEndDate,
          endTime: estimatedEndTime,
        }}
        onEdit={handleEditServices}
      />

      <FooterAction
        placement={FooterActionPlacement.JUSTIFY}
        leftButton={{
          title: "Back",
          onClick: onPrevious,
        }}
        rightButton={{
          title: "Send Appointment",
          onClick: handleSendAppointment,
          disabled: selectedPackages.length === 0,
        }}
      />
    </div>
  );
};

export default ReviewStep;
