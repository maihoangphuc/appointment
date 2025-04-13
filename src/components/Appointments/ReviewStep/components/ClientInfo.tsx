import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClientInfoProps } from "@/types/components/clientInfo";
import { Edit2 } from "lucide-react";

const ClientInfo = ({ contact, vehicleDetails, onEdit }: ClientInfoProps) => {
  const { year, make, model, type } = vehicleDetails;

  return (
    <Card className="bg-light-form-bg dark:bg-dark-form-bg p-6 border-none rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-light-text dark:text-dark-text">
          Client Information
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

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-light-text/70 dark:text-dark-text/70">
              Client
            </p>
            <p className="font-medium text-light-text dark:text-dark-text">
              {contact.label}
            </p>
          </div>
          <div>
            <p className="text-sm text-light-text/70 dark:text-dark-text/70">
              Email
            </p>
            <p className="font-medium text-light-text dark:text-dark-text">
              {contact.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-light-text/70 dark:text-dark-text/70">
              Phone
            </p>
            <p className="font-medium text-light-text dark:text-dark-text">
              {contact.phone}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-light-text/70 dark:text-dark-text/70 mb-2">
            Vehicle Details
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md text-sm text-light-text dark:text-dark-text">
              Year: {year || "2020"}
            </div>
            <div className="bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md text-sm text-light-text dark:text-dark-text">
              Make: {make || "Toyota"}
            </div>
            <div className="bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md text-sm text-light-text dark:text-dark-text">
              Model: {model || "Corolla"}
            </div>
            <div className="bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md text-sm text-light-text dark:text-dark-text">
              Vehicle Type: {type || "Sedan"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClientInfo;
