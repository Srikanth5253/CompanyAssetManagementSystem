import axiosInstance
  from "./axiosInstance";

const createReturnRequest =
  async (assetId) => {
    const response =
      await axiosInstance.post(
        "/api/return-requests",
        { assetId }
      );

    return response.data;
  };

const getMyReturnRequests =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/return-requests/my-requests"
      );

    return response.data;
  };

const getAllReturnRequests =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/return-requests"
      );

    return response.data;
  };

const approveReturnRequest =
  async (id) => {
    const response =
      await axiosInstance.put(
        `/api/return-requests/${id}/approve`
      );

    return response.data;
  };

const returnRequestService = {
  createReturnRequest,
  getMyReturnRequests,
  getAllReturnRequests,
  approveReturnRequest,
};

export default
  returnRequestService;