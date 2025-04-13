import { ServicePackage } from "../data/service";

export interface ServicesListProps {
  services: ServicePackage[];
  dateInfo: {
    startDate: string;
    endDate: string;
    endTime: string;
  };
  onEdit: () => void;
}