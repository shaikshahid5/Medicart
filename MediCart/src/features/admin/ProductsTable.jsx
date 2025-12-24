export default function ProductsTable({
  products,
  onEdit,
  onDelete
}) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Prescription <br /> required</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td className="sku">{p.sku}</td>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>₹ {p.price}</td>
            <td>
              {p.requires_rx ? (
                <span className="badge rx">Yes</span>
              ) : (
                <span className="badge ok">No</span>
              )}
            </td>
            <td>
              {p.inStock ? (
                <span className="badge ok">In Stock</span>
              ) : (
                <span className="badge warn">Out Of Stock</span>
              )}
            </td>
            <td className="actions">
              <button className="btn-secondary" onClick={() => onEdit(p)}>
                Edit
              </button>
              <button
                className="btn-primary"
                onClick={() => onDelete(p)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
