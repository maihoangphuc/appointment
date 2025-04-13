import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ServicesListProps } from "@/types/components/servicesList";
import { Edit2, FileText } from "lucide-react";
import ServiceCard from "./ServiceCard";

const ServicesList = ({ services, dateInfo, onEdit }: ServicesListProps) => {
  if (!services || services.length === 0) {
    return (
      <Card className="bg-light-form-bg dark:bg-dark-form-bg p-6 border-none rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
            Services
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-light-primary dark:text-dark-primary"
            onClick={onEdit}
          >
            <Edit2 size={16} /> Edit
          </Button>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center">
          <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-4 mb-4">
            <FileText className="w-16 h-16 text-light-primary dark:text-dark-primary" />
          </div>
          <p className="text-center text-light-text/70 dark:text-dark-text/70">
            The selected services will appear here
          </p>
          <Button variant="outline" onClick={onEdit} className="mt-4">
            Add services
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-light-form-bg dark:bg-dark-form-bg p-6 border-none rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
          Services
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-light-primary dark:text-dark-primary"
          onClick={onEdit}
        >
          <Edit2 size={16} /> Edit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            technician={{ name: "Will Son" }}
            dateInfo={{
              startDate: dateInfo.startDate,
              duration: service.estimatedTime || "2 hours 30 mins",
              endDate: dateInfo.endDate,
              endTime: dateInfo.endTime,
            }}
            showWarning={index === 2}
          />
        ))}
      </div>
    </Card>
  );
};

export default ServicesList;
