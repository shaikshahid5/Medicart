import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  fetchAdminMedicines,
  deleteMedicine
} from "./adminApi";
import ProductsTable from "./ProductsTable";
import ProductEditorModal from "./ProductEditorModal";
import "./admin.css";

export default function AdminProductsPage() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["admin-medicines"],
    queryFn: fetchAdminMedicines
  });

  const filtered = data.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (product) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${product.name}"?`
      )
    ) {
      await deleteMedicine(product.id);
      refetch();
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Admin — Medicines</h1>
          <p>Manage product catalog</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setEditingProduct({})}
        >
          + Add Medicine
        </button>
      </div>

      <input
        className="admin-search"
        placeholder="Search by name or SKU..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <p className="status">Loading medicines...</p>
      ) : (
        <ProductsTable
          products={filtered}
          onEdit={setEditingProduct}
          onDelete={handleDelete}
        />
      )}

      <ProductEditorModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSaved={refetch}
      />
    </div>
  );
}
