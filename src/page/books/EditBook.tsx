"use client";

import Loading from "@/components/layout/Loading";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

type GenreEnum = (typeof genreOptions)[number];

type BookFormData = {
  title: string;
  author: string;
  genre: GenreEnum | "";
  isbn: string;
  description?: string;
  copies: number;
};

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookData, isLoading } = useGetBookQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const book = bookData?.data;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>();

  React.useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
      });
    }
  }, [book, reset]);

  const inputClass =
    "w-full border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2";

  const onSubmit = async (data: BookFormData) => {
    try {
      await updateBook({ id, ...data, available: data.copies > 0 }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/books");
    } catch {
      toast.error("Failed to update book.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow transition-colors">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
        Edit Book
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className={inputClass}
            placeholder="Book Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Author
          </label>
          <input
            {...register("author", { required: "Author is required" })}
            className={inputClass}
            placeholder="Author Name"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Genre
          </label>
          <select
            {...register("genre", { required: "Genre is required" })}
            className={inputClass}
          >
            <option value="">-- Select Genre --</option>
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre.replace("_", " ")}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            ISBN
          </label>
          <input
            {...register("isbn", { required: "ISBN is required" })}
            className={inputClass}
            placeholder="ISBN"
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            {...register("description")}
            className={inputClass}
            placeholder="Optional description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Copies
          </label>
          <input
            type="number"
            {...register("copies", {
              required: "Copies is required",
              min: { value: 0, message: "Copies cannot be negative" },
            })}
            className={inputClass}
            placeholder="Number of Copies"
          />
          {errors.copies && (
            <p className="text-red-500 text-sm mt-1">{errors.copies.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50 transition-colors cursor-pointer"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
}
