import { Views } from "@/enums";
import { QuickViewProps } from "@/types/components/quickView";
import React, { useEffect, useState } from "react";
import ContactView from "../Views/ContactView";
import PackageView from "@/components/Views/PackageView";

const QuickView = (props: QuickViewProps) => {
  const { type, initialValues, onClose } = props;

  const [documentState, setDocumentState] = useState<any>({
    component: null,
    props: {},
  });

  useEffect(() => {
    const id = initialValues?.id;

    switch (type) {
      case Views.SELECT_CONTACT:
        setDocumentState({
          component: ContactView,
          props: { ...props, initialValues },
        });
        break;
      case Views.SELECT_PACKAGE:
        setDocumentState({
          component: PackageView,
          props: { ...props, initialValues },
        });
        break;
      default:
        break;
    }

    return () => {};
  }, [initialValues, type, onClose, props]);

  if (!documentState?.component) return <></>;

  return React.createElement(documentState.component, {
    ...props,
    ...documentState.props,
  });
};

export default QuickView;
