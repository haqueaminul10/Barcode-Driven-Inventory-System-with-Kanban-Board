import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

export const scanBarcode = async (barcode) => {
  return axios.post(`${API_BASE_URL}/scan`, { barcode });
};

export const fetchProducts = async (category) => {
  const url = category
    ? `${API_BASE_URL}/products?category=${category}`
    : `${API_BASE_URL}/products`;
  return axios.get(url);
};

export const updateProductCategory = async (id, category) => {
  return axios.patch(`${API_BASE_URL}/products/${id}`, { category });
};
