import { useEffect, useState } from "react";
import { createBatch, updateBatch } from "./batchApi";

const EMPTY = {
  medicineId: "",
  batchNo: "",
  expiryDate: "",
  qtyAvailable: ""
};

export default function BatchEditorModal({
  batch,
  medicines,
  onClose,
  onSaved
}) {
  const isEdit = Boolean(batch?.id);
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (!batch) return;
    setForm(isEdit ? batch : EMPTY);
  }, [batch, isEdit]);

  if (!batch) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateBatch({ id: batch.id, data: form });
    } else {
      await createBatch(form);
    }

    setForm(EMPTY);
    onSaved();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          {isEdit ? "Edit Batch" : "Add Batch"}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <select
              value={form.medicineId}
              onChange={(e) =>
                setForm({ ...form, medicineId: Number(e.target.value) })
              }
              required
            >
              <option value="">Select Medicine</option>
              {medicines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Batch Number"
              value={form.batchNo}
              onChange={(e) =>
                setForm({ ...form, batchNo: e.target.value })
              }
              required
            />

            <input
              type="date"
              value={form.expiryDate}
              onChange={(e) =>
                setForm({ ...form, expiryDate: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Quantity Available"
              value={form.qtyAvailable}
              onChange={(e) =>
                setForm({ ...form, qtyAvailable: e.target.value })
              }
              required
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
