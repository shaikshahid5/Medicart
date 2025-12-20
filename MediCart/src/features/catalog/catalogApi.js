import axios from "axios";

const API_URL = "http://localhost:8080";

export const fetchMedicines = async () => {
  const response = await axios.get(`${API_URL}/medicines`);
  return response.data;
};
