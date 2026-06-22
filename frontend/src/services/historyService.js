import axiosInstance from "./axiosInstance"

const getHistory = async () => {
  const response =
    await axiosInstance.get(
      "/api/history"
    );

  return response.data;
};

const historyService = {
  getHistory,
};

export default historyService;