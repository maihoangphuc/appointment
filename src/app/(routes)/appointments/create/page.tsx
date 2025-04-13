"use client";

import ClientInfoStep from "@/components/Appointments/ClientInfoStep";
import ReviewStep from "@/components/Appointments/ReviewStep";
import ServicesStep from "@/components/Appointments/ServicesStep";
import { StepIndicator } from "@/components/StepIndicator";
import { ROUTES } from "@/constants/routes";
import { useAppointmentStore } from "@/store/appointment-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateAppointmentPage() {
  const router = useRouter();
  const { currentStep, setCurrentStep, resetAppointmentState } =
    useAppointmentStore();

  useEffect(() => {
    return () => {
      resetAppointmentState();
    };
  }, [resetAppointmentState]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const handleSubmit = () => {
    resetAppointmentState();
    router.push(ROUTES.APPOINTMENTS);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ClientInfoStep onNext={handleNextStep} />;
      case 2:
        return (
          <ServicesStep
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        );
      case 3:
        return (
          <ReviewStep onPrevious={handlePreviousStep} onSubmit={handleSubmit} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center mb-6">
        <h1 className="text-xl font-bold text-light-text dark:text-dark-text">
          {currentStep === 1
            ? "Create Appointment"
            : currentStep === 2
            ? "Services"
            : "Review & Send"}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-3/4">{renderStepContent()}</div>

        <div className="lg:w-1/4">
          <StepIndicator
            steps={[
              {
                number: 1,
                title: "Client Information",
                isCompleted: currentStep > 1,
                isActive: currentStep === 1,
              },
              {
                number: 2,
                title: "Services",
                isCompleted: currentStep > 2,
                isActive: currentStep === 2,
              },
              {
                number: 3,
                title: "Review & Send",
                isCompleted: currentStep > 3,
                isActive: currentStep === 3,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
