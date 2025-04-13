import { Actions, Forms } from "@/enums";
import React, { useEffect, useState } from "react";
import NewContactForm from "../Forms/NewContactForm";
import { QuickFormProps } from "@/types/components/quickForm";

const QuickForm = (props: QuickFormProps) => {
  const { type, initialValues, status, onClose } = props;

  const [documentState, setDocumentState] = useState<any>({
    component: null,
    props: {},
  });

  useEffect(() => {
    if (status === Actions.EDIT) {
      const id = initialValues?.id;

      switch (type) {
        case Forms.NEW_CONTACT:
          setDocumentState({
            component: NewContactForm,
            props: { ...props, initialValues },
          });
          break;
        default:
          break;
      }
    } else if (status === Actions.CREATE) {
      switch (type) {
        case Forms.NEW_CONTACT:
          setDocumentState({
            component: NewContactForm,
            props: { ...props, initialValues: null },
          });
          break;
        default:
          break;
      }
    }
    return () => {};
  }, [initialValues, status, type, onClose, props]);

  if (!documentState?.component) return <></>;

  return React.createElement(documentState.component, {
    ...props,
    ...documentState.props,
  });
};

export default QuickForm;
