import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import FormCreateProduct from "../form/FormCreateProduct";
import { useToast } from "@/hooks/use-toast";
import { createProduct } from "@/utils/api";

const CreateDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toast = useToast();

  const handleFormSubmit = async (data: any) => {
    try {
      await createProduct(data);
      toast.toast({
        title: "Product Telah ditambahkan",
        description: `Produk ${data.name} telah ditambahkan ke database`,
        duration: 3000,
        variant: "success",
      });
      setOpen(false);
    } catch (error) {
      console.error("Gagal menambahkan produk: ", error);
      toast.toast({
        title: "Gagal menambahkan product",
        description: `Produk ${data.name} gagal ditambahkan ke database`,
        duration: 3000,
        variant: "destructive",
      });
    }
    console.log("Product Data: ", data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 text-white text-lg">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>Inputkan produk disini</DialogDescription>
        </DialogHeader>
        <FormCreateProduct onSubmit={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
