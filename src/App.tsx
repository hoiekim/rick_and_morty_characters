import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./pages/Main";
import ErrorBoundary from "./pages/common/ErrorBoundary";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Navigate to="/1" replace />} />
            <Route path="/:pageParam" element={<Main />} />
          </Routes>
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
