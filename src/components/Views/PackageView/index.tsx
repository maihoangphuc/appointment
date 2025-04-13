import Drawer from "@/components/Drawer";
import FooterAction from "@/components/FooterAction";
import { DataTable } from "@/components/Table";
import { Input } from "@/components/ui/input";
import { servicePackages } from "@/data/mock-data";
import { useAppointmentStore } from "@/store/appointment-store";
import { PackageViewProps } from "@/types/components/packageView";
import { ServicePackage } from "@/types/data/service";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function PackageView(props: PackageViewProps) {
  const { onClose } = props;
  const [selectedRows, setSelectedRows] = useState<ServicePackage[]>([]);

  const { setSelectedPackages } = useAppointmentStore();

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
      },
    ],
    []
  );

  const handleSelectPackages = () => {
    if (selectedRows.length > 0) {
      setSelectedPackages(selectedRows);
      onClose();
    }
  };

  const handleSelectionChange = useCallback((rows: ServicePackage[]) => {
    setSelectedRows(rows);
  }, []);

  return (
    <Drawer
      isOpen
      title="Add Package"
      onClose={onClose}
      className="sm:w-[80%] md:w-[70%] lg:w-[60%]"
      footer={
        <FooterAction
          formId="PackageView"
          placement="justify"
          leftButton={{
            onClick: onClose,
            title: "Cancel",
          }}
          rightButton={{
            title:
              selectedRows.length > 0
                ? `Select (${selectedRows.length})`
                : "Select",
            onClick: handleSelectPackages,
            disabled: selectedRows.length === 0,
          }}
        />
      }
    >
      <DataTable
        columns={columns}
        data={servicePackages}
        options={{
          selectRow: {
            enabled: true,
            placement: "end",
            header: "Action",
            onSelectionChange: handleSelectionChange,
          },
          tabs: {
            enabled: true,
            tabField: "service",
            placement: "start",
          },
          search: {
            enabled: true,
            searchFields: ["name", "service"],
            searchComponent: (
              <Input
                allowClear
                prefixIcon={<Search className="size-4" />}
                placeholder="Search by package name or service"
              />
            ),
          },
        }}
      />
    </Drawer>
  );
}
