import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  removeEmployee,
  fetchEmployees,
} from "../../redux/slices/employeeSlice";

const DeleteEmployee = ({
  employee,
  onClose,
}) => {
  const dispatch =
    useDispatch();

  const handleDelete =
    async () => {
      try {
        await dispatch(
          removeEmployee(
            employee._id
          )
        ).unwrap();

        toast.success(
          "Employee deleted successfully"
        );

        dispatch(
          fetchEmployees()
        );

        onClose();
      } catch (error) {
        toast.error(
          error ||
            "Delete failed"
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold text-slate-800">
          Delete Employee
        </h2>

        <p className="text-slate-500 mt-3">
          Are you sure you want to delete
          <span className="font-semibold text-slate-700">
            {" "}
            {employee.name}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="
              px-4 py-2
              border
              rounded-xl
            "
          >
            Cancel
          </button>

          <button
            onClick={
              handleDelete
            }
            className="
              px-4 py-2
              bg-red-600
              hover:bg-red-700
              text-white
              rounded-xl
            "
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteEmployee;