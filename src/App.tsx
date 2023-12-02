import React from "react";

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route index={true} element={<HomePage />} />
      <Route path="/categories" element={<BookCategories />} />
      <Route path="/categories/books" element={<EachCategoryPage />} />
      <Route path = "/return" element={<ReturnBook/>}/>
      
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
