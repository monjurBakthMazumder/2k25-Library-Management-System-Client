"use client";

import Loading from "@/components/layout/Loading";
import { useGetBookQuery } from "@/redux/api/baseApi";
import { Link, useParams } from "react-router";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: bookData, isLoading, isError } = useGetBookQuery(id!);

  const book = bookData?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !book) {
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        Failed to load book details.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow transition-colors">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        {book.title}
      </h2>

      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-medium">Author:</span> {book.author}
        </p>
        <p>
          <span className="font-medium">Genre:</span>{" "}
          {book.genre.replace("_", " ")}
        </p>
        <p>
          <span className="font-medium">ISBN:</span> {book.isbn}
        </p>
        {book.description && (
          <p>
            <span className="font-medium">Description:</span> {book.description}
          </p>
        )}
        <p>
          <span className="font-medium">Copies:</span> {book.copies}
        </p>
        <p>
          <span className="font-medium">Available:</span>{" "}
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
              book.available
                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
            }`}
          >
            {book.available ? "Yes" : "No"}
          </span>
        </p>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          to={`/edit-book/${book._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          Edit Book
        </Link>
        {book.available && (
          <Link
            to={`/borrow/${book._id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
          >
            Borrow Book
          </Link>
        )}
        <Link
          to="/books"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-colors"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}
