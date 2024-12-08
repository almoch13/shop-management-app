import MainLayout from "@/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import ProductsPages from "@/pages/ProductsPages";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <ProductsPages />,
      },
    ],
  },
]);
