import BaseForm from "@/components/BaseForm";
import FooterAction from "@/components/FooterAction";
import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { useZodForm } from "@/hooks/useZodForm";
import { useAppointmentStore } from "@/store/appointment-store";
import { ServiceFormProps } from "@/types/components/serviceForm";
import { ServicePackage } from "@/types/data/service";
import { FormFields } from "@/types/lib/form";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, FileText, Trash2 } from "lucide-react";
import { useMemo } from "react";

export default function ServiceForm(props: ServiceFormProps) {
  const { initialValues, setOpenListPackage, onNext, onPrevious } = props;

  const { selectedPackages, removePackage } = useAppointmentStore();

  const columns = useMemo<ColumnDef<ServicePackage>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Package Name",
      },
      {
        accessorKey: "service",
        header: "Service",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
      },
      {
        accessorKey: "estimatedTime",
        header: "Estimated Time",
        cell: ({ row }) => {
          const [hours, mins] = row.original.estimatedTime.split(" ");
          return (
            <div className="flex items-center gap-2">
              <span>{hours}</span>
              <span>hours</span>
              <span>{mins || "30"}</span>
              <span>mins</span>
            </div>
          );
        },
      },
    ],
    []
  );

  const fields = useMemo<FormFields[]>(
    () => [
      {
        groupFields: true,
        rootClassNames:
          "bg-light-form-bg dark:bg-dark-form-bg p-4 rounded-md flex flex-col gap-4",
        components: [
          {
            name: "packages",
            label: "Add Packages",
            type: "string",
            component: (
              <Button
                type="button"
                variant="outline"
                className="w-full h-9 flex justify-between items-center cursor-pointer text-left font-normal border-input bg-light-bg dark:bg-dark-card-bg border-light-border dark:border-dark-border"
                onClick={() => setOpenListPackage(true)}
              >
                <span className="text-muted-foreground">Select contact</span>
                <span className="opacity-50">
                  <ChevronDown />
                </span>
              </Button>
            ),
            renderExtra: (component) => (
              <div className="w-full space-y-4">
                <div>{component}</div>

                {selectedPackages.length === 0 ? (
                  <div className="mt-12 flex flex-col items-center justify-center">
                    <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 mb-4">
                      <FileText className="size-10 text-blue-500" />
                    </div>
                    <p className="text-center text-light-text/70 dark:text-dark-text/70">
                      The selected packages will appear here
                    </p>
                  </div>
                ) : (
                  <div className="mt-6">
                    <DataTable
                      columns={columns}
                      data={selectedPackages}
                      options={{
                        action: {
                          enabled: true,
                          placement: "end",
                          header: "Action",
                          onClick: (row) => {
                            removePackage(row.id);
                          },
                          icon: <Trash2 className="size-4 text-red-500" />,
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            ),
            validation: { required: true },
            messages: { required: "Package is required" },
          },
        ],
      },
    ],
    [columns, removePackage, selectedPackages, setOpenListPackage]
  );

  const form = useZodForm(fields, {
    initialValues: {
      ...initialValues,
      packages: selectedPackages.length > 0 ? selectedPackages : undefined,
    },
  });

  return (
    <div className="space-y-4">
      <BaseForm
        id="serviceForm"
        form={form}
        fields={fields}
        onSubmit={() => onNext()}
      />

      <div className="mt-8 flex justify-between">
        <FooterAction
          formId="serviceForm"
          placement="justify"
          leftButton={{
            title: "Back",
            onClick: () => onPrevious(),
          }}
          rightButton={{
            title: "Next",
            onClick: () => onNext(),
            disabled: selectedPackages.length === 0,
          }}
        />
      </div>
    </div>
  );
}
