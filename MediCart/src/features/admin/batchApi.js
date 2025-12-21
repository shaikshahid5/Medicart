import axios from "axios";

const API = "http://localhost:8080";

export const fetchBatches = async () => {
  const res = await axios.get(`${API}/batches`);
  return res.data;
};

export const fetchMedicines = async () => {
  const res = await axios.get(`${API}/medicines`);
  return res.data;
};

export const createBatch = async (data) => {
  const res = await axios.post(`${API}/batches`, data);
  return res.data;
};

export const updateBatch = async ({ id, data }) => {
  const res = await axios.put(`${API}/batches/${id}`, data);
  return res.data;
};

export const deleteBatch = async (id) => {
  await axios.delete(`${API}/batches/${id}`);
};
