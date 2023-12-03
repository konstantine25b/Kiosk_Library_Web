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

// Define the type for the BookInfo context
type BookInfo = {
  book: Book | null;
  setBook: React.Dispatch<React.SetStateAction<Book | null>>;
};

// Create a context for user-related data
export const UserContext = createContext<BookInfo | undefined>(undefined);

// Create a router instance for routing
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
    // Provide UserContext with the book and setBook values
    <UserContext.Provider value={{ book, setBook }}>
      {/* Use RouterProvider to enable routing in your application */}
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
