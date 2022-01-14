import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AppBody from "./components/AppBody";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Navigate to="/1" replace />} />
          <Route path="/:pageParam" element={<AppBody />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
