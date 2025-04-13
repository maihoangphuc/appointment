import { Contact } from "../data/contact";

export interface ClientInfoProps {
  contact: Contact;
  vehicleDetails: {
    year: string;
    make: string;
    model: string;
    type: string;
  };
  onEdit: () => void;
}