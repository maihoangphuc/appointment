import { Card } from "@/components/ui/card";
import { ServiceCardProps } from "@/types/components/serviceCard";
import Image from "next/image";

const ServiceCard = ({
  service,
  technician = { name: "Will Son" },
  dateInfo,
  showWarning = false,
}: ServiceCardProps) => {
  return (
    <Card className="rounded-lg border border-light-form-border dark:border-dark-form-border overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-slate-100/30 dark:bg-slate-800/30">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <Image
              src={service.image}
              alt="Car"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="font-medium text-light-text dark:text-dark-text">
            {service.name}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-light-text/70 dark:text-dark-text/70">
            Total Cost
          </span>
          <span className="ml-2 font-semibold text-light-text dark:text-dark-text">
            ${service.price}
          </span>
        </div>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-light-text/70 dark:text-dark-text/70">
              Service
            </p>
            <p className="font-medium text-light-text dark:text-dark-text">
              {service.service}
            </p>
          </div>
          <div>
            <p className="text-sm text-light-text/70 dark:text-dark-text/70">
              Option
            </p>
            <p className="font-medium text-light-text dark:text-dark-text">
              Carbon Film
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-light-text/70 dark:text-dark-text/70">
            Technician Assigned
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-6 h-6 bg-light-primary dark:bg-dark-primary rounded-full"></div>
            <p className="font-medium text-light-text dark:text-dark-text">
              {technician.name}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div>
            <p className="text-sm text-light-text/70 dark:text-dark-text/70">
              Start Date
            </p>
            <p className="font-medium text-light-text dark:text-dark-text">
              {dateInfo.startDate}
            </p>
          </div>
          <div>
            <p className="text-sm text-light-text/70 dark:text-dark-text/70">
              Start Time
            </p>
            <p className="font-medium text-light-text dark:text-dark-text">
              {dateInfo.duration}
            </p>
          </div>
          <div>
            <p className="text-sm text-light-text/70 dark:text-dark-text/70">
              Estimated End Time
            </p>
            <p className="font-medium text-light-text dark:text-dark-text">
              {dateInfo.endDate} - {dateInfo.endTime}
            </p>
          </div>
          {showWarning && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-2">
              This time exceeds the appointment&apos;s estimated time.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
