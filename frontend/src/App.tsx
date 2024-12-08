import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import ProductsPages from "./pages/ProductsPages";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="products" element={<ProductsPages />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
