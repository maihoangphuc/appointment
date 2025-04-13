import BaseForm from "@/components/BaseForm";
import FooterAction from "@/components/FooterAction";
import QuickView from "@/components/QuickView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  vehicleMakes,
  vehicleModels,
  vehicleTypes,
  vehicleYears,
} from "@/data/mock-data";
import { Views } from "@/enums";
import { useZodForm } from "@/hooks/useZodForm";
import { useAppointmentStore } from "@/store/appointment-store";
import { VehicleDetailFormProps } from "@/types/components/vehicleDetailForm";
import { FormFields } from "@/types/lib/form";
import { ChevronDown, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function VehicleDetailForm({
  setOpenNewContact,
  onNext,
}: VehicleDetailFormProps) {
  const [openListContact, setOpenListContact] = useState(false);
  const {
    vehicleYearManual,
    vehicleMakeManual,
    vehicleModelManual,
    vehicleTypeManual,
    contact,
    isManual,
    vehicleYear,
    vehicleMake,
    vehicleModel,
    vehicleType,
    setIsManual,
    setVehicleYear,
    setVehicleMake,
    setVehicleModel,
    setVehicleType,
    setVehicleYearManual,
    setVehicleMakeManual,
    setVehicleModelManual,
    setVehicleTypeManual,
    setContact,
  } = useAppointmentStore();

  const initialValues = {
    contact: contact?.label || "",
    vehicleYear: vehicleYear,
    vehicleMake: vehicleMake,
    vehicleModel: vehicleModel,
    vehicleType: vehicleType,
    vehicleYearManual: vehicleYearManual || "",
    vehicleMakeManual: vehicleMakeManual || "",
    vehicleModelManual: vehicleModelManual || "",
    vehicleTypeManual: vehicleTypeManual || "",
  };

  const storeUpdates = {
    vehicleYear: setVehicleYear,
    vehicleMake: setVehicleMake,
    vehicleModel: setVehicleModel,
    vehicleType: setVehicleType,
    vehicleYearManual: setVehicleYearManual,
    vehicleMakeManual: setVehicleMakeManual,
    vehicleModelManual: setVehicleModelManual,
    vehicleTypeManual: setVehicleTypeManual,
  };

  const fields = useMemo<FormFields[]>(
    () => [
      {
        groupFields: true,
        rootClassNames:
          "bg-light-form-bg dark:bg-dark-form-bg p-4 rounded-md flex flex-col gap-4",
        components: [
          {
            name: "contact",
            label: "Contact",
            type: "string",
            component: (
              <Button
                type="button"
                variant="outline"
                className="w-full h-9 flex justify-between items-center cursor-pointer text-left font-normal border-input bg-light-bg dark:bg-dark-card-bg border-light-border dark:border-dark-border"
                onClick={() => setOpenListContact(true)}
              >
                <span className="text-muted-foreground">Select contact</span>
                <span className="opacity-50">
                  <ChevronDown />
                </span>
              </Button>
            ),
            rootClassNames: "w-full",
            renderExtra: (component) =>
              contact ? (
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-4">
                  <div className="hidden">{component}</div>
                  <div className="lg:mb-0 lg:mr-5 text-gray-500 font-medium">
                    Client
                  </div>

                  <div className="flex flex-wrap w-fit gap-4 items-center">
                    <div>{contact.label}</div>
                    <div>{contact.email}</div>
                    <div>{contact.phone}</div>
                    <Button
                      type="button"
                      variant="link"
                      className="text-red-600 p-0"
                      onClick={() => setContact(null)}
                    >
                      <X />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex gap-2 items-center">
                  <div className="flex-grow">{component}</div>
                  <Button
                    size="icon"
                    type="button"
                    variant="outline"
                    className="border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card-bg"
                    onClick={() => setOpenNewContact(true)}
                  >
                    <Plus />
                  </Button>
                </div>
              ),
            validation: { required: true },
            messages: { required: "Contact is required" },
          },
          {
            groupFields: true,
            label: "Vehicle Detail",
            required: true,
            rootClassNames:
              "border border-light-form-border dark:border-dark-form-border p-4 rounded-md flex flex-col gap-4",
            components: [
              {
                name: isManual ? "vehicleYearManual" : "vehicleYear",
                label: "Year",
                type: "string",
                component: isManual ? (
                  <Input allowClear placeholder="Enter year" />
                ) : (
                  <Select
                    allowClear
                    options={vehicleYears}
                    placeholder="Select year"
                  />
                ),
                validation: { required: true },
                messages: { required: "Vehicle year is required" },
              },
              {
                name: isManual ? "vehicleMakeManual" : "vehicleMake",
                label: "Make",
                type: "string",
                component: isManual ? (
                  <Input allowClear placeholder="Enter make" />
                ) : (
                  <Select
                    allowClear
                    options={vehicleMakes}
                    placeholder="Select make"
                  />
                ),
                validation: { required: true },
                messages: { required: "Vehicle make is required" },
              },
              {
                name: isManual ? "vehicleModelManual" : "vehicleModel",
                label: "Model",
                type: "string",
                component: isManual ? (
                  <Input allowClear placeholder="Enter model" />
                ) : (
                  <Select
                    allowClear
                    options={vehicleModels}
                    placeholder="Select model"
                  />
                ),
                validation: { required: true },
                messages: { required: "Vehicle model is required" },
              },
              {
                name: isManual ? "vehicleTypeManual" : "vehicleType",
                label: "Vehicle Type",
                type: "string",
                component: isManual ? (
                  <Input allowClear placeholder="Enter vehicle type" />
                ) : (
                  <Select
                    allowClear
                    options={vehicleTypes}
                    placeholder="Select vehicle type"
                  />
                ),
                validation: { required: true },
                messages: { required: "Vehicle type is required" },
              },
            ],
          },
          {
            notField: true,
            label: (
              <button
                type="button"
                onClick={() => setIsManual(!isManual)}
                className="text-blue-500 text-sm"
              >
                {isManual
                  ? "I prefer to pick from the available Vehicle options."
                  : "Can't find a vehicle? Enter it manually."}
              </button>
            ),
          },
        ],
      },
    ],
    [contact, isManual, setContact, setOpenNewContact, setIsManual]
  );

  const form = useZodForm(fields, { initialValues });

  return (
    <div className="space-y-4">
      <BaseForm
        id="vehicleDetailForm"
        form={form}
        fields={fields}
        onSubmit={() => onNext()}
        storeUpdates={storeUpdates}
      />

      <div className="mt-8 flex justify-end">
        <FooterAction
          formId="vehicleDetailForm"
          rightButton={{
            title: "Next",
            disabled: !form.formState.isValid,
          }}
        />
      </div>

      {openListContact && (
        <QuickView
          type={Views.SELECT_CONTACT}
          onClose={() => setOpenListContact(false)}
        />
      )}
    </div>
  );
}
