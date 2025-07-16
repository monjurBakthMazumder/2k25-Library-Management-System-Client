"use client";

import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import Loading from "@/components/layout/Loading";

type BorrowFormData = {
  quantity: number;
  dueDate: string;
};

export default function BorrowBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: bookData, isLoading } = useGetBookQuery(bookId ?? "");
  const [borrowBook, { isLoading: isSubmitting }] = useBorrowBookMutation();

  const book = bookData?.data;

  const availableCopies = book?.copies;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowFormData>();

  const inputClass =
    "w-full border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2";

  const onSubmit = async (formData: BorrowFormData) => {
    if (!book) return;

    try {
      const payload = {
        book: book._id,
        quantity: Number(formData.quantity),
        dueDate: formData.dueDate,
      };
      await borrowBook(payload).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to borrow the book.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!book) {
    return (
      <div className="text-center py-10 text-red-500">
        Book not found or unavailable.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow transition-colors">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
        Borrow: {book.title}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quantity{" "}
            {availableCopies !== undefined && `(Available: ${availableCopies})`}
          </label>
          <input
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: {
                value: 1,
                message: "You must borrow at least 1 copy",
              },
              max: {
                value: availableCopies ?? 1,
                message: `Cannot borrow more than ${availableCopies} copies`,
              },
            })}
            className={inputClass}
            placeholder="Enter quantity"
            disabled={availableCopies === 0}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Due Date
          </label>
          <input
            type="date"
            {...register("dueDate", {
              required: "Due date is required",
            })}
            className={inputClass}
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded disabled:opacity-50 transition-color cursor-pointer"
          disabled={isSubmitting || availableCopies === 0}
        >
          {isSubmitting ? "Borrowing..." : "Borrow Book"}
        </button>
      </form>
    </div>
  );
}
