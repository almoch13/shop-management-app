import React from "react";
import { productSchema } from "@/utils/productSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


type ProductFormValues = z.infer<typeof productSchema>;

interface FormCreateProductProps {
  onSubmit: (data: ProductFormValues) => void;
}

const FormCreateProduct: React.FC<FormCreateProductProps> = ({ onSubmit }) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <Label className="text-sm mb-5">Nama produk</Label>
        <Input type="text" {...register("name")} className="my-2" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-2">
        <Label className="text-sm mb-5">Motif</Label>
        <Input type="text" {...register("motif")} className="my-2" />
        {errors.motif && (
          <p className="text-red-500 text-sm">{errors.motif.message}</p>
        )}
      </div>
      <div className="mb-2">
        <Label className="text-sm mb-5">Kategori</Label>
        <Input type="text" {...register("category")} className="my-2" />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div className="my-1">
        <div className="flex justify-between items-center">
          <Label className="text-sm">Stok</Label>
          <div className="flex justify-evenly items-center w-1/2">
            <Input
              type="Number"
              {...register("stock")}
              className="my-2 w-3/4"
            />
            <span>Pcs</span>
          </div>
        </div>
        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}
      </div>
      <div className="my-1">
        <div className="flex justify-between items-center">
          <Label className="text-sm">Harga Barang</Label>
          <div className="flex justify-evenly items-center w-1/2">
            <Input
              type="Number"
              {...register("sellingPrice")}
              className="my-2 w-3/4"
            />
            <span>Rp</span>
          </div>
        </div>
        {errors.sellingPrice && (
          <p className="text-red-500 text-sm">{errors.sellingPrice.message}</p>
        )}
      </div>
      <div className="flex justify-end p-3 mt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default FormCreateProduct;
