import axiosInstance from "./axiosInstance";

const getEmployees = async () => {
  const response =
    await axiosInstance.get(
      "/api/employees"
    );

  return response.data;
};

const createEmployee =
  async (employeeData) => {
    const response =
      await axiosInstance.post(
        "/api/employees",
        employeeData
      );

    return response.data;
  };


  const updateEmployee = async (
  id,
  employeeData
) => {
  const response =
    await axiosInstance.put(
      `/api/employees/${id}`,
      employeeData
    );

  return response.data;
};

const deleteEmployee = async (
  id
) => {
  const response =
    await axiosInstance.delete(
      `/api/employees/${id}`
    );

  return response.data;
};

const employeeService = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;