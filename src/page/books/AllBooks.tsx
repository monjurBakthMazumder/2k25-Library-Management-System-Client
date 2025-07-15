"use client";

import Loading from "@/components/layout/Loading";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/api/baseApi";
import type { Book } from "@/type";
import { Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaRegHandPaper } from "react-icons/fa";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AllBooks() {
  const { data: books, isLoading, isError } = useGetAllBooksQuery({});
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully.");
    } catch {
      toast.error("Failed to delete the book.");
    }
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        Failed to load books.
      </div>
    );
  }

  return (
    <div className="px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
        All Books
      </h1>

      {books?.data?.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300">
          No books found.{" "}
          <Link to="/create-book" className="text-blue-600 hover:underline">
            Add a new book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A list of all books in the library.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead className="text-center">Copies</TableHead>
                <TableHead className="text-center">Available</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books?.data?.map((book: Book) => (
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre?.replace("_", " ")}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell className="text-center">{book.copies}</TableCell>
                  <TableCell className="text-center">
                    {book.available ? (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                        No
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2 text-lg">
                      <Link
                        to={`/books/${book._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye />
                      </Link>
                      <Link
                        to={`/edit-book/${book._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <AiOutlineEdit />
                      </Link>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-red-600 hover:text-red-800 cursor-pointer">
                            <AiOutlineDelete />
                          </button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Delete Book</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this book? This
                              action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                className="bg-red-600 hover:bg-red-800"
                                onClick={() => handleDelete(book._id)}
                              >
                                Confirm Delete
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {book.available ? (
                        <Link
                          to={`/borrow/${book._id}`}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <FaRegHandPaper />
                        </Link>
                      ) : (
                        <button className="text-yellow-500/80 cursor-not-allowed">
                          <FaRegHandPaper />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
