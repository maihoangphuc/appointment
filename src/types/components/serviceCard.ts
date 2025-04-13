import { ServicePackage } from "../data/service";

export interface ServiceCardProps {
  service: ServicePackage;
  technician?: {
    name: string;
    avatar?: string;
  };
  dateInfo: {
    startDate: string;
    duration: string;
    endDate: string;
    endTime: string;
  };
  showWarning?: boolean;
}