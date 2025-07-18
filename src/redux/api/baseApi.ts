import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ph-l2-assignment-3.vercel.app//api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: ["Book"],
    }),

    getBook: builder.query({
      query: (id: string) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),

    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),

    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Book", id },
        "Book",
      ],
    }),

    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),

    borrowBook: builder.mutation({
      query: (data) => ({
        url: `/borrow`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),

    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = libraryApi;
