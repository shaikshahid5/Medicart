import axios from "axios";

const API_URL = "http://localhost:8080";

export const fetchAdminMedicines = async () => {
  const res = await axios.get(`${API_URL}/medicines`);
  return res.data;
};

export const createMedicine = async (data) => {
  const res = await axios.post(`${API_URL}/medicines`, data);
  return res.data;
};

export const updateMedicine = async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/medicines/${id}`, data);
  return res.data;
};

export const deleteMedicine = async (id) => {
  await axios.delete(`${API_URL}/medicines/${id}`);
};
