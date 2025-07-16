/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/components/layout/Loading";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery({});

  if (isLoading) return <Loading />;

  if (isError || !data?.data) {
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        Failed to load borrow summary.
      </div>
    );
  }

  return (
    <div className="px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
        Borrow Summary
      </h1>

      {data.data.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No books have been borrowed yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A summary of all borrowed books.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Total Borrowed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.book?.title || "N/A"}</TableCell>
                  <TableCell>{item.book?.isbn || "N/A"}</TableCell>
                  <TableCell>{item.totalQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
