import countFeePrice from "../utils/countFeePrice.js";
import prisma from "../utils/prismaClient.js";

export const createProduct = async (req, res) => {
  const { name, motif, category, stock, sellingPrice } = req.body;
  const FeePrice = countFeePrice(sellingPrice);

  try {
    const product = await prisma.product.create({
      data: {
        name,
        motif,
        category,
        stock,
        sellingPrice,
        FeePrice,
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, motif, category, stock, sellingPrice } = req.body;
  const FeePrice = countFeePrice(sellingPrice);

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        motif,
        category,
        stock,
        sellingPrice,
        FeePrice,
      },
    });

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
