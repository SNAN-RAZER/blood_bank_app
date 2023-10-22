const { axiosInstance } = require("../axiosInstance");

// Api call for user registration
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5001/v1/api/user/register-user",
      payload
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:5001/v1/api/user/login-user",
      payload
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserData = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:5001/v1/api/user/get-user-data"
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllDonorsOfAnOrganization = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:5001/v1/api/user/get-all-donors"
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
export const getAllHospitalsOfAnOrganization = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:5001/v1/api/user/get-all-hospitals"
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
