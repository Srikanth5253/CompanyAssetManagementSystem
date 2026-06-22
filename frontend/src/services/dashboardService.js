import axiosInstance from "./axiosInstance"

const getDashboardStats =
  async () => {

    const response =
      await axiosInstance.get(
        "/api/dashboard/stats"
      );

    return response.data;
  };

const getEmployeeDashboard =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/dashboard/employee"
      );

    return response.data;
  };

const getAssetCategoryReport =
  async () => {

    const response =
      await axiosInstance.get(
        "/api/dashboard/asset-category-report"
      );

    return response.data;
  };

  const getRequestReport =
  async () => {

    const response =
      await axiosInstance.get(
        "/api/dashboard/request-report"
      );

    return response.data;
  };

const dashboardService = {
  getDashboardStats,
  getEmployeeDashboard,
  getAssetCategoryReport,
  getRequestReport,
};

export default dashboardService;