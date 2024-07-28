import { authenticatedApiClient } from "./apiClient";

export const createProduct = async (data) => {
  return await authenticatedApiClient.post("/api/products/create", data);
};

export const getProducts = async () => {
  return await authenticatedApiClient.get("/api/products");
};

export const getProductById = async (id) => {
  return await authenticatedApiClient.get(`/api/products/${id}`);
};

export const updateProduct = async (id, data) => {
  return await authenticatedApiClient.put(`/api/products/${id}`, data);
};

export const deleteProduct = async (id) => {
  return await authenticatedApiClient.delete(`/api/products/${id}`);
};

export const createAttributes = async (data) => {
  return await authenticatedApiClient.post(`/api/new/attributes`, data);
};
