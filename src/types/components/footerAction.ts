interface FooterButton {
  onClick?: () => void;
  title?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export type FooterActionPlacementType = "start" | "end" | "justify";

export interface FooterActionProps {
  formId?: string;
  placement?: FooterActionPlacementType;
  leftButton?: FooterButton | boolean;
  rightButton?: FooterButton | boolean;
} 