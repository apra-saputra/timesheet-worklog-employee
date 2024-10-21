import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type PageInfo = {
  pageIndex: number;
  pageSize: number;
  count?: number;
  totalPage?: number;
};

interface DataWithId {
  id: number;
  [key: string]: any;
}

interface ServerDataTableProps<TData extends DataWithId, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  pageInfo: PageInfo;
  setPageInfo: React.Dispatch<React.SetStateAction<PageInfo>>;
  selected?: number[];
  setSelected?: React.Dispatch<React.SetStateAction<number[]>>;
  className?: string;
  selectAll?: boolean;
}

const limitValueAndText = [
  { value: "0", text: "LIMIT" },
  { value: "5", text: "5" },
  { value: "10", text: "10" },
  { value: "15", text: "15" },
  { value: "20", text: "20" },
];

function ServerDataTableComponent<TData extends DataWithId, TValue>({
  columns,
  data,
  pageInfo,
  setPageInfo,
  setSelected,
  selected,
  className,
  selectAll,
}: ServerDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPageInfo,
    manualPagination: true,
    state: {
      rowSelection,
      pagination: {
        pageIndex: pageInfo.pageIndex,
        pageSize: pageInfo.pageSize,
      },
    },
    pageCount: pageInfo.totalPage,
  });

  useEffect(() => {
    // console.log(Object.keys(rowSelection).length);
    if (Object.keys(rowSelection).length) {
      setSelected?.((prevSelected) => {
        const data = table
          .getSelectedRowModel()
          .rows.map((el) => el.original.id);

        // Menggabungkan data baru dengan yang sudah ada tanpa duplikasi
        const updatedSelected = [...prevSelected];
        data.forEach((item) => {
          if (!updatedSelected.some((selectedItem) => selectedItem === item)) {
            updatedSelected.push(item);
          }
        });

        return updatedSelected;
      });
    }
  }, [JSON.stringify(rowSelection), selectAll, selected?.length]);

  useEffect(() => {
    if (selectAll && selected?.length) {
      const transformedObject = selected?.reduce((acc, _, index) => {
        acc[index] = true;
        return acc;
      }, {} as { [key: number]: boolean }) as RowSelectionState;

      setRowSelection(transformedObject);
    }

    if (!selectAll && !selected?.length) {
      setRowSelection({});

      // setSelected?.([]);
    }
  }, [selectAll, selected?.length, Object.keys(rowSelection).length]);

  return (
    <div className={cn(`rounded-lg w-full border`, className)}>
      <Table className="min-w-fit">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`uppercase ${
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center px-2">
        <div className="flex gap-2 items-center text-wrap min-w-fit">
          <Select
            onValueChange={(value) =>
              setPageInfo((state) => {
                state.pageSize = Number(value);
                return { ...state };
              })
            }
            value={String(pageInfo.pageSize)}
          >
            <SelectTrigger className="bg-gray-600 drop-shadow-lg w-20">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>

            <SelectContent className="w-8">
              {limitValueAndText.map((item) => (
                <SelectItem
                  value={item.value}
                  key={item.value}
                  disabled={!!Number(item)}
                >
                  {item.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>total data: {pageInfo.count ?? 0}</span>|
          <span>
            current page:{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>{" "}
            |{" "}
          </span>
          {!!setSelected && (
            <div className="flex gap-2 items-center">
              <span>total select {selected?.length}</span>
              {/* {!!Object.keys(rowSelection).length && (
                )} */}
            </div>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First Page
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last Page
          </Button>
        </div>
      </div>
    </div>
  );
}

export const TableComponent = React.memo(
  ServerDataTableComponent
) as typeof ServerDataTableComponent;
