"use client";

import ConfirmForm from "@/components/ConfirmForm";
import FooterAction from "@/components/FooterAction";
import { DataTable } from "@/components/Table";
import { Constants } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { mockAppointments } from "@/data/mock-data";
import { Actions } from "@/enums";
import {
  TableAction,
  TableExecuteAction,
  TableExecuteActionProps,
  TableRowAction,
} from "@/types/components/table";
import { Appointment } from "@/types/data/appointments";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Eye, Pencil, Plus, RefreshCcw, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const AppointmentsPage = () => {
  const router = useRouter();
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columns = useMemo<ColumnDef<Appointment>[]>(
    () => [
      {
        accessorKey: "clientName",
        header: "Client",
        cell: ({ row }) => {
          return (
            <div>
              <Link href={`/appointments/${row.original.id}`}>
                <span className="text-link font-medium block">
                  {row.original.clientName || Constants.EMPTY_STRING}
                </span>
              </Link>
              <span className="text-sm text-muted-foreground">
                {row.original.clientEmail || Constants.EMPTY_STRING}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "service",
        header: "Service",
        cell: ({ row }) => (
          <div>
            <span className="block">
              {row.original.service || Constants.EMPTY_STRING}
            </span>
            <span className="text-sm text-muted-foreground">
              {row.original.serviceDetails || Constants.EMPTY_STRING}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: "Date & Time",
        cell: ({ row }) => (
          <div>
            <span className="block">
              {dayjs(row.original.date).format("MMM DD, YYYY") ||
                Constants.EMPTY_STRING}
            </span>
            <span className="text-sm text-muted-foreground">
              {row.original.time || Constants.EMPTY_STRING}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "vehicle",
        header: "Vehicle",
        cell: ({ row }) => (
          <div>
            <span className="block">
              {row.original.vehicle || Constants.EMPTY_STRING}
            </span>
            <span className="text-sm text-muted-foreground">
              {row.original.vehicleYear || Constants.EMPTY_STRING}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status || Constants.EMPTY_STRING;
          let statusClass = "inline-block px-2 py-1 rounded text-xs";

          switch (status) {
            case "Completed":
              statusClass += " bg-green-100 text-green-800";
              break;
            case "Scheduled":
              statusClass += " bg-blue-100 text-blue-800";
              break;
            case "In Progress":
              statusClass += " bg-yellow-100 text-yellow-800";
              break;
            case "Cancelled":
              statusClass += " bg-red-100 text-red-800";
              break;
            default:
              statusClass += " bg-gray-100 text-gray-800";
          }

          return <span className={statusClass}>{status}</span>;
        },
      },
    ],
    []
  );

  const actions = useMemo<TableAction[]>(
    () => [
      {
        name: Actions.CREATE,
        label: "Create Appointment",
        icon: <Plus className="h-4 w-4" />,
      },
      {
        name: Actions.REFRESH,
        label: "Refresh",
        icon: <RefreshCcw className="h-4 w-4" />,
      },
    ],
    []
  );

  const rowActions = useMemo<TableRowAction<Appointment>[]>(
    () => [
      {
        name: Actions.VIEW,
        label: "View",
        icon: <Eye className="h-4 w-4" />,
      },
      {
        name: Actions.EDIT,
        label: "Edit",
        disabled: true,
        icon: <Pencil className="h-4 w-4" />,
      },
      {
        name: Actions.DELETE,
        label: "Delete",
        icon: <X className="h-4 w-4" />,
      },
    ],
    []
  );

  const exeActions = useMemo<TableExecuteAction<Appointment>[]>(
    () => [
      {
        name: Actions.REFRESH,
        onClick: async () => {
          setIsLoading(true);
          setTimeout(() => {
            setAppointments([...mockAppointments]);
            setIsLoading(false);
          }, 500);
        },
      },
      {
        name: Actions.VIEW,
        onClick: (data?: Appointment) =>
          data && router.push(`${ROUTES.APPOINTMENTS}/${data.id}`),
      },
      {
        name: Actions.CREATE,
        onClick: () => router.push(ROUTES.APPOINTMENTS_CREATE),
      },
      {
        name: Actions.EDIT,
      },
      {
        name: Actions.DELETE,
        component: (props: TableExecuteActionProps) => {
          const { record, onClose } = props;
          return (
            <ConfirmForm
              title="Delete appointment"
              description="Are you sure you want to delete this appointment?"
              onClose={onClose}
              onSubmit={() => {
                setAppointments(
                  appointments.filter((app) => app.id !== record.id)
                );
                onClose();
              }}
              footer={
                <FooterAction
                  formId="newContactForm"
                  leftButton={{
                    onClick: onClose,
                    title: "Cancel",
                  }}
                  rightButton={{
                    title: "Delete",
                  }}
                />
              }
            />
          );
        },
      },
    ],
    [appointments, router]
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <DataTable
        columns={columns}
        data={appointments}
        rowActions={rowActions}
        actions={actions}
        exeActions={exeActions}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AppointmentsPage;
