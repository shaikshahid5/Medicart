export default function BatchTable({
  batches,
  medicines,
  onEdit,
  onDelete
}) {
  const getMedicineName = (medicineId) => {
    const med = medicines.find(
      (m) => Number(m.id) === Number(medicineId)
    );
    return med ? med.name : "Unknown";
  };

  const today = new Date();

  const getStatus = (expiry) => {
    const exp = new Date(expiry);
    const diffDays = (exp - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) return "expired";
    if (diffDays <= 60) return "warning";
    return "active";
  };

  return (
    <table className="batch-table">
      <thead>
        <tr>
          <th>Medicine</th>
          <th>Batch No</th>
          <th>Expiry</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {batches.map((b) => {
          const status = getStatus(b.expiryDate);

          return (
            <tr key={b.id}>
              <td>{getMedicineName(b.medicineId)}</td>
              <td>{b.batchNo}</td>
              <td>{b.expiryDate}</td>
              <td>{b.qtyAvailable}</td>
              <td>
                <span className={`badge ${status}`}>
                  {status.toUpperCase()}
                </span>
              </td>
              <td className="actions">
                <button
                  className="btn-icon"
                  onClick={() => onEdit(b)}
                >
                  Edit
                </button>
                <button
                  className="btn-danger"
                  onClick={() => onDelete(b)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
