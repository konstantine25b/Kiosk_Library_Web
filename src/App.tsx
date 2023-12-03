import React, { createContext, useState } from "react";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import HomePage from "./Pages/HomePage";
import BookCategories from "./Pages/BookCategories";
import Root from "./Root";
import ReturnBook from "./Pages/ReturnBook";
import EachCategoryPage from "./Pages/EachCategoryPage";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

// this is a book user selects in borrow books section
type BookInfo = {
  book: Book | null;
  setBook: React.Dispatch<React.SetStateAction<Book>>;
};

export const UserContext = createContext<
  | {
      book: Book | null;
      setBook: React.Dispatch<React.SetStateAction<Book | null>>;
    }
  | undefined
>(undefined);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index={true} element={<HomePage />} />
      <Route path="/categories" element={<BookCategories />} />
      <Route path="/categories/books" element={<EachCategoryPage />} />
      <Route path="/return" element={<ReturnBook />} />
    </Route>
  )
);

function App() {
  const [book, setBook] = useState<Book | null>(null);
  return (
    <UserContext.Provider
      value={{
        book,
        setBook,
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
