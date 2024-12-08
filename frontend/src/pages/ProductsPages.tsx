import CreateDialog from "@/components/dialog/CreateDialog";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const ProductsPages: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Products!</h1>

      <CreateDialog />
      <Toaster />
    </div>
  );
};

export default ProductsPages;
