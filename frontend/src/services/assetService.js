import axiosInstance
  from "./axiosInstance";

const getAssets =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/assets"
      );

    return response.data;
  };

const createAsset =
  async (assetData) => {
    const response =
      await axiosInstance.post(
        "/api/assets",
        assetData
      );

    return response.data;
  };

const updateAsset =
  async (
    id,
    assetData
  ) => {
    const response =
      await axiosInstance.put(
        `/api/assets/${id}`,
        assetData
      );

    return response.data;
  };

const deleteAsset =
  async (id) => {
    const response =
      await axiosInstance.delete(
        `/api/assets/${id}`
      );

    return response.data;
  };

const assignAsset =
  async (
    assetId,
    employeeId
  ) => {
    const response =
      await axiosInstance.put(
        `/api/assets/${assetId}/assign`,
        {
          employeeId,
        }
      );

    return response.data;
  };

const returnAsset =
  async (assetId) => {
    const response =
      await axiosInstance.put(
        `/api/assets/${assetId}/return`
      );

    return response.data;
  };

const getMyAssets =
  async () => {
    const response =
      await axiosInstance.get(
        "/api/assets/my-assets"
      );

    return response.data;
  };

const retireAsset =
  async (id, reason) => {

    const response =
      await axiosInstance.put(
        `/api/assets/${id}/retire`,
        { reason }
      );

    return response.data;
  };


const assetService = {
  getAssets,
  createAsset,
  updateAsset,
  deleteAsset,
  assignAsset,
  returnAsset,
  getMyAssets,
  retireAsset,
};

export default assetService;