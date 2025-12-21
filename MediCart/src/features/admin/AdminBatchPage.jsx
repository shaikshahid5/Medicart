import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  fetchBatches,
  fetchMedicines,
  deleteBatch
} from "./batchApi";
import BatchTable from "./BatchTable";
import BatchEditorModal from "./BatchEditorModal";
import "./batch.css";

export default function AdminBatchPage() {
  const [editingBatch, setEditingBatch] = useState(null);

  const { data: batches = [], refetch } = useQuery({
    queryKey: ["batches"],
    queryFn: fetchBatches
  });

  const { data: medicines = [] } = useQuery({
    queryKey: ["medicines"],
    queryFn: fetchMedicines
  });

  const handleDelete = async (batch) => {
    if (window.confirm(`Delete batch ${batch.batchNo}?`)) {
      await deleteBatch(batch.id);
      refetch();
    }
  };

  return (
    <div className="batch-container">
      <div className="batch-header">
        <div>
          <h1>Batch & Inventory</h1>
          <p>Manage stock, expiry & batch tracking</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setEditingBatch({})}
        >
          + Add Batch
        </button>
      </div>

      <BatchTable
        batches={batches}
        medicines={medicines}
        onEdit={setEditingBatch}
        onDelete={handleDelete}
      />

      <BatchEditorModal
        batch={editingBatch}
        medicines={medicines}
        onClose={() => setEditingBatch(null)}
        onSaved={refetch}
      />
    </div>
  );
}
