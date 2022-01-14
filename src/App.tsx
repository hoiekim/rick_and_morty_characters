import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AppBody from "./components/AppBody";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Navigate to="/1" replace />} />
            <Route path="/:pageParam" element={<AppBody />} />
          </Routes>
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
