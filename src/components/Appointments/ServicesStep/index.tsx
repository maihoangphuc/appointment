import { Views } from "@/enums";
import { useState } from "react";
import QuickView from "@/components/QuickView";
import ServiceForm from "@/components/Forms/ServiceForm";
import { ServicesStepProps } from "@/types/components/servicesStep";

export default function ServicesStep({
  onNext,
  onPrevious,
}: ServicesStepProps) {
  const [openPackageView, setOpenPackageView] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <ServiceForm
        openListPackage={openPackageView}
        setOpenListPackage={setOpenPackageView}
        onNext={onNext}
        onPrevious={onPrevious}
      />

      {openPackageView && (
        <QuickView
          type={Views.SELECT_PACKAGE}
          onClose={() => setOpenPackageView(false)}
        />
      )}
    </div>
  );
}
