import React from "react";
import { Link } from "react-router-dom";
import LogoutDialog from "./dialog/LogoutDialog";

const Navbar: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-2 px-4">
      <div className="flex justify-between items-center space-x-6">
        <h1 className="text-lg font-bold text-blue-400">Lifami Store</h1>
        <nav className="flex justify-between items-center space-x-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/products">Products</Link>
        </nav>
      </div>
      <LogoutDialog />
    </header>
  );
};

export default Navbar;
