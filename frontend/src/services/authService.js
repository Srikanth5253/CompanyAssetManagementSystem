import axiosInstance from "./axiosInstance"; 

const register = async (userData) => {
  const response = await axiosInstance.post(
    "/api/auth/register",
    userData
  );

  return response.data;
};

const login = async (userData) => {
  const response = await axiosInstance.post(
    "/api/auth/login",
    userData
  );

  return response.data;
};

const changePassword = async (
  passwordData
) => {
  const response =
    await axiosInstance.put(
      "/api/auth/change-password",
      passwordData
    );

  return response.data;
};

const authService = {
  register,
  login,
  changePassword,
};

export default authService;