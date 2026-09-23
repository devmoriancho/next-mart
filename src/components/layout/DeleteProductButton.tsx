"use client";

import { deleteProducts } from "@/server-actions/products/deleteProduct";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";

interface DeleteProductButtonProps {
  productId: string;
  onDeleted?: (productId: string) => void;
}

export default function DeleteProductButton({
  productId,
  onDeleted,
}: DeleteProductButtonProps) {
  const [isDeleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      const result = await deleteProducts(productId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      onDeleted?.(productId);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label="Delete product"
      className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-destructive hover:bg-destructive/10 hover:border-destructive/20 transition cursor-pointer active:scale-95 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "..." : <FiTrash2 size={14} />}
    </button>
  );
}
