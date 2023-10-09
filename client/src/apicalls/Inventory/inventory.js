import { axiosInstance } from "../axiosInstance";

export const addInventory = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5001/v1/api/inventory/add-inventory",
      payload
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getInventory = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:5001/v1/api/inventory/get-inventory"
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
