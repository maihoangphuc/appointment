import Drawer from "@/components/Drawer";
import FooterAction from "@/components/FooterAction";
import BaseForm from "@/components/BaseForm";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Actions } from "@/enums";
import { toast } from "@/hooks/use-toast";
import { useZodForm } from "@/hooks/useZodForm";
import { FormFields, InferFormType } from "@/types/lib/form";
import { Constants } from "@/constants";
import { useAppointmentStore } from "@/store/appointment-store";
import { contacts } from "@/data/mock-data";
import { NewContactFormProps } from "@/types/components/newContactForm";

export default function NewContactForm(props: NewContactFormProps) {
  const { onClose, status, initialValues } = props;
  const isEdit = status === Actions.EDIT;

  const { setContact } = useAppointmentStore();

  const fields: FormFields[] = [
    {
      name: "name",
      label: "Name",
      type: "string",
      component: <Input allowClear placeholder="Name" />,
      validation: { required: true },
      messages: { required: "Name is required" },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      component: <Input allowClear placeholder="Email" />,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "string",
      component: <Input allowClear placeholder="Phone number" />,
      validation: { regex: Constants.REGEX.PHONE },
      messages: { regex: "Invalid phone number format" },
    },
    {
      name: "additionalPhone",
      label: "Additional Phone Number",
      type: "string",
      component: <Input allowClear placeholder="Phone number" />,
      validation: { regex: Constants.REGEX.PHONE },
      messages: { regex: "Invalid phone number format" },
    },
    {
      name: "notes",
      label: "Note",
      type: "string",
      component: (
        <Textarea allowClear placeholder="Enter" className="min-h-[100px]" />
      ),
    },
  ];

  const customRefinement = {
    refine: (data: any) => Boolean(data.email || data.phone),
    message: "Please enter at least one field: email or phone number",
    path: ["email", "phone"],
  };

  const form = useZodForm(fields, {
    initialValues: initialValues || {},
    customRefinement,
    formOptions: {
      mode: "onSubmit",
    },
  });

  const handleSubmit = (values: InferFormType<typeof fields>) => {
    if (isEdit) return;

    const newContact = {
      id: String(contacts.length + 1),
      label: values.name,
      value: values.name.toLowerCase().replace(/\s+/g, "-"),
      email: values.email || "",
      phone: values.phone || "",
      additionalPhone: values.additionalPhone || "",
      notes: values.notes || "",
    };

    contacts.push(newContact);

    setContact(newContact);

    toast({ title: "Contact created successfully", placement: "topRight" });

    onClose();
  };

  return (
    <Drawer
      isOpen
      title="Add Contact"
      onClose={onClose}
      footer={
        <FooterAction
          formId="newContactForm"
          leftButton={{
            onClick: onClose,
            title: "Cancel",
          }}
          rightButton={{
            title: "Create",
          }}
        />
      }
    >
      <div>
        <p className="text-xs mb-4">
          Please enter at least one field: email or phone number.
        </p>
        <BaseForm
          id="newContactForm"
          form={form}
          fields={fields}
          onSubmit={handleSubmit}
        />
      </div>
    </Drawer>
  );
}
