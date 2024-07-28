import { axiosHaveAuthV2, axiosNotHaveAuthV2 } from "./axiosConfig";

class ApiClient {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async get(url, params = {}) {
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(url, data) {
    try {
      const response = await this.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put(url, data) {
    try {
      const response = await this.axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(url) {
    try {
      const response = await this.axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const authenticatedApiClient = new ApiClient(axiosHaveAuthV2);
export const publicApiClient = new ApiClient(axiosNotHaveAuthV2);
