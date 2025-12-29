import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import AddressList from './AddressList';
import Navbar from '../../components/navbar-1/Navbar';

const STORAGE_KEY = 'addresses';

const loadAddresses = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
};

const saveAddresses = (addresses) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
};

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initial = loadAddresses();
    setAddresses(initial);
    const def = initial.find(a => a.isDefault);
    if (def) setSelectedId(def.id);
  }, []);

  useEffect(() => {
    saveAddresses(addresses);
  }, [addresses]);

  const defaultAddressId = useMemo(
    () => addresses.find(a => a.isDefault)?.id || null,
    [addresses]
  );

  const handleSave = (data) => {
    if (editing) {
      setAddresses(prev => {
        const updated = prev.map(a => (a.id === editing ? { ...a, ...data } : a));
        if (data.isDefault) {
          return updated.map(a => ({ ...a, isDefault: a.id === editing }));
        }
        return updated;
      });
      setEditing(null);
    } else {
      const id = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
      const newAddress = { ...data, id };
      setAddresses(prev => {
        let next = [...prev, newAddress];
        if (newAddress.isDefault || prev.length === 0) {
          next = next.map(a => ({ ...a, isDefault: a.id === id }));
        }
        return next;
      });
      setSelectedId(id);
    }
  };

  const handleEdit = (id) => setEditing(id);

  const handleDelete = (id) => {
    setAddresses(prev => {
      const remaining = prev.filter(a => a.id !== id);
      if (selectedId === id) {
        setSelectedId(remaining.find(a => a.isDefault)?.id || remaining[0]?.id || null);
      }
      if (remaining.length > 0 && !remaining.some(a => a.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
    if (editing === id) setEditing(null);
  };

  const handleSetDefault = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    setSelectedId(id);
  };

  const handleSelectForDelivery = (id) => setSelectedId(id);

  const editingData = addresses.find(a => a.id === editing) || null;

  return (
    <div style={styles.page}>
    <Navbar />
      <div style={styles.topBar}>
        <button
          onClick={() => navigate("/cart")}
          className="text-green-700 border border-green-700 px-4 py-2 rounded hover:bg-green-50 transition mb-6"
        >
          ← Back to Cart
        </button>
        <h1 style={styles.title}>Delivery Address</h1>
      </div>

      <div style={styles.layout}>
        <div style={styles.left}>
          <h2 style={styles.sectionTitle}>{editing ? 'Edit Address' : 'Add New Address'}</h2>
          <AddressForm
            initialValues={editingData}
            onCancel={() => setEditing(null)}
            onSubmit={handleSave}
          />
        </div>

        <div style={styles.right}>
          <h2 style={styles.sectionTitle}>Saved Addresses</h2>
          {addresses.length === 0 ? (
            <div style={styles.empty}>
              <p>No addresses saved yet.</p>
              <p>Add one using the form on the left.</p>
            </div>
          ) : (
            <AddressList
              addresses={addresses}
              selectedId={selectedId}
              onSelect={handleSelectForDelivery}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          )}
          <div style={styles.footer}>
            <button
              style={styles.primary}
              onClick={() => {
                if (addresses.length === 0) {
                  alert('Please add an address first before proceeding with delivery.');
                } else if (!selectedId) {
                  alert('Please select an address for delivery.');
                } else {
                  alert(`Deliver to address ID: ${selectedId}`);
                }
              }}
            >
              Deliver Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: '32px', fontFamily: 'system-ui, Arial, sans-serif' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  backButton: {
    background: 'transparent',
    border: 'none',
    color: '#2fbf5d',
    fontSize: 16,
    cursor: 'pointer',
    fontWeight: 600,
  },
  title: { color:'#2fbf5d', fontSize: '1.8rem' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' },
  left: { border: '1px solid #eee', borderRadius: 8, padding: 16 },
  right: { border: '1px solid #eee', borderRadius: 8, padding: 16 },
  sectionTitle: { fontSize: '1.2rem', marginBottom: 12 },
  empty: { color: '#666', background: '#fafafa', padding: 16, borderRadius: 8 },
  footer: { marginTop: 16, display: 'flex', justifyContent: 'flex-end' },
  primary: { background: '#2fbf5d', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 6, cursor: 'pointer' },
};

export default AddressPage;