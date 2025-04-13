import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type SelectRowOptions = {
  enabled: boolean;
  placement?: 'start' | 'end';
  header?: string;
  onSelectionChange?: (selectedRows: any[]) => void;
  selectType?: 'only' | 'all';
}

export type SearchExtraComponentProps = {
  searchComponent: React.ReactNode;
}

export type SearchOptions = {
  enabled: boolean;
  searchComponent?: React.ReactNode;
  searchDebounce?: number;
  searchExtraComponent?: (props: SearchExtraComponentProps) => React.ReactNode;
  searchFields?: string[];
}

export type TabOptions<TData = any> = {
  enabled: boolean;
  tabField?: keyof TData;
  onTabChange?: (tabValue: string) => void;
  customTabs?: { value: string; label: string }[];
  placement?: 'start' | 'end' | 'center';
}

export type ActionOptions = {
  enabled: boolean;
  placement?: 'start' | 'end';
  header?: string;
  onClick?: (row: any) => void;
  icon?: React.ReactNode;
}

export type BaseAction = {
  name: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}

export type TableRowAction<TData> = BaseAction & {
  onClick?: (data: TData) => void | Promise<void>;
}

export type TableAction = BaseAction & {
  onClick?: () => void | Promise<void>;
}

export type TableExecuteActionProps = {
  status: string;
  record: any;
  onClose: () => void;
}

export type TableExecuteAction<TData> = {
  name: string;
  component?: (props: TableExecuteActionProps) => React.ReactNode;
  onClick?: (data?: TData) => void | Promise<void>;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  rowActions?: TableRowAction<TData>[];
  actions?: TableAction[];
  exeActions?: TableExecuteAction<TData>[];
  options?: {
    selectRow?: SelectRowOptions;
    search?: SearchOptions;
    tabs?: TabOptions<TData>;
    showAddButton?: boolean;
    onAddClick?: () => void;
    action?: ActionOptions;
  };
}
