import axiosInstance from "./axiosInstance";

export const createMaintenanceRequest =
  async (data) => {
    const response =
      await axiosInstance.post(
        "/api/maintenance-requests",
        data
      );

    return response.data;
  };

export const getMyMaintenanceRequests =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/maintenance-requests/my-requests"
      );

    return response.data;
  };

export const getAllMaintenanceRequests =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/maintenance-requests"
      );

    return response.data;
  };

export const startRepair =
  async (id) => {

    const response =
      await axiosInstance.put(
        `/api/maintenance-requests/${id}/start`
      );

    return response.data;
  };

export const completeRepair =
  async (id) => {

    const response =
      await axiosInstance.put(
        `/api/maintenance-requests/${id}/complete`
      );

    return response.data;
  };

const maintenanceService = {
  createMaintenanceRequest,
  getMyMaintenanceRequests,
  getAllMaintenanceRequests,
  startRepair,
  completeRepair,
};

export default maintenanceService;