import VehicleDetailForm from "@/components/Forms/VehicleDetailForm";
import QuickForm from "@/components/QuickForm";
import { Actions, Forms } from "@/enums";
import { ClientInfoStepProps } from "@/types/components/clientInfoStep";
import { useState } from "react";

export default function ClientInfoStep({ onNext }: ClientInfoStepProps) {
  const [openNewContact, setOpenNewContact] = useState<boolean>(false);

  return (
    <div className="w-full space-y-6">
      <VehicleDetailForm
        setOpenNewContact={setOpenNewContact}
        onNext={onNext}
      />

      {openNewContact && (
        <QuickForm
          type={Forms.NEW_CONTACT}
          status={Actions.CREATE}
          onClose={() => setOpenNewContact(false)}
        />
      )}
    </div>
  );
}
