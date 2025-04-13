import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabPlacement } from "@/enums";
import { cn } from "@/lib/utils";
import { DataTableProps } from "@/types/components/table";
import {
  ColumnDef,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import debounce from "lodash/debounce";
import { EllipsisVertical, Plus, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export function DataTable<TData, TValue>({
  columns,
  data,
  rowActions = [],
  actions = [],
  exeActions = [],
  isLoading = false,
  options,
}: DataTableProps<TData, TValue>) {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<TData | null>(null);
  const [actionKey, setActionKey] = useState<number>(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TData[]>(data);
  const [activeTab, setActiveTab] = useState<string>("all");

  const filterDataByTab = React.useCallback(
    (tabValue: string, dataToFilter: TData[]) => {
      if (tabValue === "all") {
        return dataToFilter;
      }

      const tabField = options?.tabs?.tabField || "service";

      return dataToFilter.filter((item: any) => {
        let fieldValue: any;

        if (typeof tabField === "string") {
          fieldValue = tabField
            .split(".")
            .reduce((obj: any, part: string) => obj && obj[part], item);
        } else {
          fieldValue = item[tabField as keyof typeof item];
        }

        return (
          fieldValue &&
          String(fieldValue).toLowerCase() === tabValue.toLowerCase()
        );
      });
    },
    [options?.tabs?.tabField]
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (options?.tabs?.onTabChange) {
      options.tabs.onTabChange(value);
    }
  };

  const applyFilters = React.useCallback(
    (searchText: string, tabValue: string) => {
      let filtered = data;

      if (searchText.trim()) {
        const searchLower = searchText.toLowerCase();
        const searchFields = options?.search?.searchFields;

        filtered = data.filter((item) => {
          if (searchFields && searchFields.length > 0) {
            return searchFields.some((field) => {
              const value = field
                .split(".")
                .reduce((obj: any, part) => obj && obj[part], item);
              if (typeof value === "string" || typeof value === "number") {
                return String(value).toLowerCase().includes(searchLower);
              }
              return false;
            });
          }

          return Object.values(item as object).some((value) => {
            if (typeof value === "string" || typeof value === "number") {
              return String(value).toLowerCase().includes(searchLower);
            }
            return false;
          });
        });
      }

      filtered = filterDataByTab(tabValue, filtered);

      setFilteredData(filtered);
    },
    [data, options?.search?.searchFields, filterDataByTab]
  );

  const debouncedSearch = React.useMemo(() => {
    return debounce((value: string) => {
      applyFilters(value, activeTab);
    }, options?.search?.searchDebounce || 300);
  }, [options?.search?.searchDebounce, activeTab, applyFilters]);

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, debouncedSearch]);

  useEffect(() => {
    applyFilters(searchValue, activeTab);
  }, [data, searchValue, activeTab, applyFilters]);

  const handleActionClick = (
    actionName: string,
    record: TData | null = null,
    callback?: () => void | Promise<void>
  ) => {
    if (callback) {
      callback();
    }

    const exeAction = exeActions.find((action) => action.name === actionName);

    if (exeAction?.onClick) {
      if (record) {
        exeAction.onClick(record);
      } else {
        exeAction.onClick();
      }
    }

    setActiveAction(null);
    setSelectedRecord(null);

    if (exeAction?.component) {
      setTimeout(() => {
        setActiveAction(actionName);
        setSelectedRecord(record);
        setActionKey((prev) => prev + 1);
      }, 0);
    }
  };

  const handleClose = () => {
    setActiveAction(null);
    setSelectedRecord(null);
  };

  const selectionColumn: ColumnDef<TData, any> = {
    id: "select",
    header: ({ table }) => {
      if (options?.selectRow?.header) {
        return <span className="font-medium">{options.selectRow.header}</span>;
      }

      if (options?.selectRow?.selectType === "only") {
        return <span className="w-5 h-5 block"></span>;
      }

      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          if (options?.selectRow?.selectType === "only" && value === true) {
            // First deselect all rows
            const rowIds = table.getRowModel().rows.map((r) => r.id);
            const newRowSelection: RowSelectionState = {};

            // Then only select the current row
            if (value) {
              newRowSelection[row.id] = true;
            }

            setRowSelection(newRowSelection);
          } else {
            row.toggleSelected(!!value);
          }
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const actionColumn: ColumnDef<TData, any> = {
    id: "action-column",
    header: () => {
      return options?.action?.header ? (
        <span className="font-medium">{options.action.header}</span>
      ) : (
        <span className="font-medium">Action</span>
      );
    },
    cell: ({ row }) => (
      <button
        className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700"
        onClick={() => options?.action?.onClick?.(row.original)}
      >
        {options?.action?.icon || <X className="h-4 w-4" />}
      </button>
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const finalColumns: ColumnDef<TData, TValue>[] = [
    ...(options?.selectRow?.enabled
      ? options.selectRow.placement === "end"
        ? [...columns, selectionColumn as any]
        : [selectionColumn as any, ...columns]
      : columns),
    ...(options?.action?.enabled && options.action.placement === "start"
      ? [actionColumn as any]
      : []),
    ...(rowActions.length > 0
      ? [
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }: { row: any }) => (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="h-8 w-8 p-0 cursor-pointer">
                    <span className="sr-only">Open menu</span>
                    <EllipsisVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-light-bg dark:bg-black border-light-border dark:border-dark-border"
                  align="end"
                >
                  {rowActions
                    .filter((action) => !action.hidden)
                    .map((action, index) => (
                      <DropdownMenuItem
                        key={action.name || index}
                        onClick={() =>
                          handleActionClick(action.name, row.original, () =>
                            action.onClick?.(row.original)
                          )
                        }
                        disabled={action.disabled}
                        className="text-light-text dark:text-white hover:bg-light-primary/20 dark:hover:bg-dark-primary/20"
                      >
                        {action.icon && <span>{action.icon}</span>}
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          },
        ]
      : []),
  ];

  // Place action column at the end if placement is end or not specified
  if (
    options?.action?.enabled &&
    (options.action.placement === "end" || !options.action.placement)
  ) {
    finalColumns.push(actionColumn as any);
  }

  const table = useReactTable({
    data: filteredData,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: options?.selectRow?.enabled ?? false,
    onRowSelectionChange: (updater) => {
      if (options?.selectRow?.selectType === "only") {
        const newSelectionState =
          typeof updater === "function" ? updater(rowSelection) : updater;

        const selectedRowIds = Object.keys(newSelectionState).filter(
          (id) => newSelectionState[id]
        );

        if (selectedRowIds.length > 1) {
          const latestRowId = selectedRowIds[selectedRowIds.length - 1];
          const updatedState: RowSelectionState = {};
          updatedState[latestRowId] = true;
          setRowSelection(updatedState);
        } else {
          setRowSelection(newSelectionState);
        }
      } else {
        setRowSelection(updater);
      }
    },
    state: {
      rowSelection,
    },
  });

  const isMounted = React.useRef(false);

  const prevSelectionRef = React.useRef<RowSelectionState>({});

  React.useEffect(() => {
    if (options?.selectRow?.onSelectionChange && isMounted.current) {
      if (
        JSON.stringify(prevSelectionRef.current) !==
        JSON.stringify(rowSelection)
      ) {
        const selectedRows = table
          .getSelectedRowModel()
          .rows.map((row) => row.original);
        options.selectRow.onSelectionChange(selectedRows);
        prevSelectionRef.current = { ...rowSelection };
      }
    }

    isMounted.current = true;
  }, [rowSelection, options?.selectRow, table]);

  const renderSearch = () => {
    if (!options?.search?.enabled) return null;

    const defaultSearchComponent = (
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <Input
          className="pl-10 h-12 bg-gray-100 dark:bg-gray-800 border-0"
          placeholder={`Search by ${
            options?.search?.searchFields?.join(", ") || "all fields"
          }`}
          value={searchValue}
          onChange={(e) => e && setSearchValue(e.target.value)}
        />
      </div>
    );

    let searchComponent;
    if (options.search.searchComponent) {
      const originalComponent = options.search
        .searchComponent as React.ReactElement;
      searchComponent = React.cloneElement(originalComponent, {
        value: searchValue,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value),
        ...originalComponent.props,
      });
    } else {
      searchComponent = defaultSearchComponent;
    }

    if (options.search.searchExtraComponent) {
      return options.search.searchExtraComponent({ searchComponent });
    }

    return (
      <div className="flex items-center w-full">
        {searchComponent}
        {options.showAddButton && (
          <Button
            className="ml-2 h-12 w-12 p-0 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700"
            onClick={options.onAddClick}
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
    );
  };

  const getTabs = () => {
    if (options?.tabs?.customTabs) {
      return options.tabs.customTabs;
    }

    const tabField = options?.tabs?.tabField || "service";
    const values = new Set<string>();

    data.forEach((item: any) => {
      let fieldValue: any;

      if (typeof tabField === "string") {
        fieldValue = tabField
          .split(".")
          .reduce((obj: any, part: string) => obj && obj[part], item);
      } else {
        fieldValue = item[tabField as keyof typeof item];
      }

      if (fieldValue) {
        values.add(String(fieldValue));
      }
    });

    return Array.from(values).map((value) => ({
      value: value.toLowerCase(),
      label: value,
    }));
  };

  const tabs = getTabs();

  return (
    <>
      {options?.search?.enabled && (
        <div className="relative mb-4">{renderSearch()}</div>
      )}

      {options?.tabs?.enabled && tabs.length > 0 && (
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="mb-4"
        >
          <TabsList
            className={`w-full bg-transparent p-0 overflow-x-auto flex-nowrap gap-2 ${
              options?.tabs?.placement === TabPlacement.END
                ? "justify-end"
                : options?.tabs?.placement === TabPlacement.CENTER
                ? "justify-center"
                : "justify-start"
            }`}
          >
            <TabsTrigger
              value="all"
              className={cn(
                "py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 font-medium transition-colors",
                activeTab === "all"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              All
            </TabsTrigger>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className="flex justify-end pb-3 gap-2">
        {actions
          .filter((action) => !action.hidden)
          .map((action, index) => (
            <Button
              key={action.name || index}
              variant="outline"
              size="sm"
              onClick={() =>
                handleActionClick(action.name, null, action.onClick)
              }
              disabled={action.disabled}
              className="flex items-center gap-2 cursor-pointer"
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
      </div>

      {activeAction &&
        exeActions.map((exeAction) => {
          if (exeAction.name === activeAction && exeAction.component) {
            return (
              <div key={actionKey}>
                {exeAction.component({
                  status: exeAction.name,
                  record: selectedRecord,
                  onClose: handleClose,
                })}
              </div>
            );
          }
          return null;
        })}

      <div className="rounded-md border border-solid border-light-border dark:border-dark-border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-solid border-light-border dark:border-dark-border"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="border-b border-solid border-light-border dark:border-dark-border">
                <TableCell
                  colSpan={finalColumns.length}
                  className="h-24 text-center"
                >
                  Loading data...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className={
                    row.getIsSelected()
                      ? "bg-blue-900/20 hover:bg-blue-900/30 border-b border-solid border-light-border dark:border-dark-border"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-solid border-light-border dark:border-dark-border"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-b border-solid border-light-border dark:border-dark-border">
                <TableCell
                  colSpan={finalColumns.length}
                  className="h-24 text-center"
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
