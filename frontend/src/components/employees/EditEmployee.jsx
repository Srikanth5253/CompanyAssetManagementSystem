import { useState, useEffect } from "react";
import { FiX, FiUser, FiPhone } from "react-icons/fi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  updateEmployee,
  fetchEmployees,
} from "../../redux/slices/employeeSlice";

const EditEmployee = ({
  selectedEmployee,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    designation: "",
    phone: "",
    status: "active",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name || "",
        department:
          selectedEmployee.department || "",
        designation:
          selectedEmployee.designation || "",
        phone: selectedEmployee.phone || "",
        status:
          selectedEmployee.status || "active",
      });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await dispatch(
      updateEmployee({
        id: selectedEmployee._id,
        employeeData: formData,
      })
    ).unwrap();

    toast.success(
      "Employee updated successfully"
    );

    dispatch(fetchEmployees());

    onClose();
  } catch (error) {
    toast.error(
      error || "Failed to update employee"
    );
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Edit Employee
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Update employee details
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              icon={<FiUser />}
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />

            <Input
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />

            <Input
              icon={<FiPhone />}
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-slate-50
                  py-3
                  px-4
                  focus:ring-2
                  focus:ring-emerald-500
                  focus:border-emerald-500
                  focus:outline-none
                "
              >
                <option value="active">
                  Active
                </option>
                <option value="inactive">
                  Inactive
                </option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="
                px-5
                py-3
                rounded-xl
                border
                border-slate-300
                text-slate-600
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-5
                py-3
                rounded-xl
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                font-medium
              "
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({
  label,
  icon,
  ...props
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      {label}
    </label>

    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-3.5 text-slate-400">
          {icon}
        </div>
      )}

      <input
        {...props}
        className={`
          w-full
          rounded-xl
          border
          border-slate-300
          bg-slate-50
          py-3
          ${icon ? "pl-10" : "pl-4"}
          pr-4
          focus:ring-2
          focus:ring-emerald-500
          focus:border-emerald-500
          focus:outline-none
        `}
      />
    </div>
  </div>
);

export default EditEmployee;