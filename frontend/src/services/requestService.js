import axiosInstance from "./axiosInstance";

const createRequest = async (
  requestData
) => {
  const response =
    await axiosInstance.post(
      "/api/requests",
      requestData
    );

  return response.data;
};

const getMyRequests =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/requests/my-requests"
      );

    return response.data;
  };

const getAllRequests =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/requests"
      );

    return response.data;
  };

const updateRequestStatus =
  async (
    id,
    statusData
  ) => {
    const response =
      await axiosInstance.put(
        `/api/requests/${id}`,
        statusData
      );

    return response.data;
  };

const requestService = {
  createRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
};

export default requestService;