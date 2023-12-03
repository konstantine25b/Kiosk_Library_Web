import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Use ReactDOM.createRoot for concurrent mode
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Wrap the App component with QueryClientProvider to enable React Query
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);
