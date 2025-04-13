import Drawer from "@/components/Drawer";
import FooterAction from "@/components/FooterAction";
import QuickForm from "@/components/QuickForm";
import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contacts } from "@/data/mock-data";
import { Actions, Forms } from "@/enums";
import { useAppointmentStore } from "@/store/appointment-store";
import { ContactViewProps } from "@/types/components/contactView";
import { Contact } from "@/types/data/contact";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function ContactView(props: ContactViewProps) {
  const { onClose } = props;
  const [selectedRows, setSelectedRows] = useState<Contact[]>([]);
  const [openNewContact, setOpenNewContact] = useState<boolean>(false);

  const { setContact } = useAppointmentStore();

  const columns = useMemo<ColumnDef<Contact>[]>(
    () => [
      {
        accessorKey: "label",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
    ],
    []
  );

  const handleSelectContact = () => {
    if (selectedRows.length > 0) {
      setContact(selectedRows[0]);
      onClose();
    }
  };

  const handleSelectionChange = useCallback((rows: Contact[]) => {
    setSelectedRows(rows);
  }, []);

  return (
    <>
      <Drawer
        isOpen
        title="Contact"
        onClose={onClose}
        className="sm:w-[80%] md:w-[70%] lg:w-[60%]"
        footer={
          <FooterAction
            formId="ContactView"
            placement="justify"
            leftButton={{
              onClick: onClose,
              title: "Cancel",
            }}
            rightButton={{
              title: "Select",
              onClick: handleSelectContact,
              disabled: selectedRows.length === 0,
            }}
          />
        }
      >
        <DataTable
          columns={columns}
          data={contacts}
          options={{
            selectRow: {
              enabled: true,
              placement: "end",
              header: "Action",
              onSelectionChange: handleSelectionChange,
              selectType: "only",
            },
            search: {
              enabled: true,
              searchFields: ["label", "email", "phone"],
              searchComponent: (
                <Input
                  allowClear
                  prefixIcon={<Search className="size-4" />}
                  placeholder="Search by name, phone number or email"
                />
              ),
              searchExtraComponent: ({ searchComponent }) => (
                <div className="w-full flex gap-2 items-center">
                  <div className="flex-grow">{searchComponent}</div>
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
            },
          }}
        />
      </Drawer>
      {openNewContact && (
        <QuickForm
          type={Forms.NEW_CONTACT}
          status={Actions.CREATE}
          onClose={() => setOpenNewContact(false)}
        />
      )}
    </>
  );
}
