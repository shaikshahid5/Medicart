import { useEffect, useState } from "react";
import {
  createMedicine,
  updateMedicine
} from "./adminApi";

const EMPTY_FORM = {
  sku: "",
  name: "",
  category: "Tablet",
  price: "",
  requires_rx: false,
  inStock: true
};

export default function ProductEditorModal({
  product,
  onClose,
  onSaved
}) {
  const isEdit = Boolean(product?.id);

  const [form, setForm] = useState(EMPTY_FORM);

  /* 🔁 HANDLE OPEN / MODE CHANGE */
  useEffect(() => {
    if (!product) return;

    if (isEdit) {
      // EDIT MODE → load product
      setForm(product);
    } else {
      // ADD MODE → reset form
      setForm(EMPTY_FORM);
    }
  }, [product, isEdit]);

  if (!product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateMedicine({
        id: product.id,
        data: form
      });
    } else {
      await createMedicine(form);
    }

    onSaved();

    // ✅ CLEAR FORM AFTER SAVE
    setForm(EMPTY_FORM);

    // ✅ CLOSE MODAL
    onClose();
  };

  const handleClose = () => {
    // ✅ CLEAR FORM ON CANCEL
    setForm(EMPTY_FORM);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* HEADER */}
        <div className="modal-header">
          {isEdit ? "Edit Medicine" : "Add Medicine"}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <input
              placeholder="SKU (e.g. PCM-650)"
              value={form.sku}
              onChange={(e) =>
                setForm({ ...form, sku: e.target.value })
              }
              required
            />

            <input
              placeholder="Medicine Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value
                })
              }
            >
              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
              <option value="Syrup">Syrup</option>
              <option value="Injection">Injection</option>
              <option value="Powder">Powder</option>
            </select>

            <input
              type="number"
              placeholder="Price (₹)"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
            />

            {/* CHECKBOXES */}
            <div className="checkbox-group">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={form.requires_rx}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      requires_rx: e.target.checked
                    })
                  }
                />
                <span>Prescription Required</span>
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      inStock: e.target.checked
                    })
                  }
                />
                <span>In Stock</span>
              </label>
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleClose}
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
