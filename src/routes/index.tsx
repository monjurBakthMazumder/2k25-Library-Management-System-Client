import App from "@/App";
import AllBooks from "@/page/books/AllBooks";
import BookDetails from "@/page/books/BookDetails";
import BorrowBook from "@/page/books/BorrowBook";
import CreateBook from "@/page/books/CreateBook";
import EditBook from "@/page/books/EditBook";
import BorrowSummary from "@/page/borrow-summary/BorrowSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: AllBooks,
      },
      {
        path: "books",
        Component: AllBooks,
      },
      {
        path: "create-book",
        Component: CreateBook,
      },
      {
        path: "books/:id",
        Component: BookDetails,
      },
      {
        path: "edit-book/:id",
        Component: EditBook,
      },
      {
        path: "borrow/:bookId",
        Component: BorrowBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
