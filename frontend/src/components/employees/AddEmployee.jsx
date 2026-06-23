import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import {
  addEmployee,
  fetchEmployees,
} from "../../redux/slices/employeeSlice";

const AddEmployee = () => {

  const dispatch =
    useDispatch();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      employeeId: "",
      department: "",
      designation: "",
      phone: "",
    });

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (!formData.name.trim()) {
        return toast.error("Name is required");
      }

      if (!formData.email.trim()) {
        return toast.error("Email is required");
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(
          formData.email
        )
      ) {
        return toast.error(
          "Please enter a valid email address"
        );
      }

      if (!formData.password.trim()) {
        return toast.error(
          "Password is required"
        );
      }

      if (
        formData.password.length < 6
      ) {
        return toast.error(
          "Password must be at least 6 characters"
        );
      }

      if (
        !formData.employeeId.trim()
      ) {
        return toast.error(
          "Employee ID is required"
        );
      }

      if (
        !formData.department.trim()
      ) {
        return toast.error(
          "Department is required"
        );
      }

      if (
        !formData.designation.trim()
      ) {
        return toast.error(
          "Designation is required"
        );
      }

      if (!formData.phone.trim()) {
        return toast.error(
          "Phone number is required"
        );
      }

      if (
        !/^[6-9]\d{9}$/.test(
          formData.phone
        )
      ) {
        return toast.error(
          "Enter a valid 10-digit phone number"
        );
      }

      try {
        await dispatch(
          addEmployee(formData)
        ).unwrap();

        toast.success(
          "Employee created successfully"
        );

        dispatch(
          fetchEmployees()
        );

        navigate("/dashboard/employees");

      } catch (error) {
        toast.error(
          error ||
          "Failed to create employee"
        );
      }
    };

  return (

    <div className="max-w-6xl mx-auto">

      <div className="overflow-hidden">

        <form
          onSubmit={
            handleSubmit
          }
          className="p-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Input
              icon={<FiUser />}
              label="Name"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
            />

            <Input
              icon={<FiMail />}
              label="Email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-slate-50
        py-3
        pl-4
        pr-12
        focus:ring-2
        focus:ring-emerald-500
        focus:border-emerald-500
        focus:outline-none
      "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-slate-400
        hover:text-slate-600
      "
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>

              </div>
            </div>

            <Input
              label="Employee ID"
              name="employeeId"
              value={
                formData.employeeId
              }
              onChange={
                handleChange
              }
            />

            <Input
              label="Department"
              name="department"
              value={
                formData.department
              }
              onChange={
                handleChange
              }
            />

            <Input
              label="Designation"
              name="designation"
              value={
                formData.designation
              }
              onChange={
                handleChange
              }
            />

            <Input
              icon={<FiPhone />}
              label="Phone"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
            />

          </div>

          <div className="flex justify-end gap-3 mt-8">

            <button
              type="button"
              onClick={() => navigate("/dashboard/employees")}
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
              Create Employee
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
          ${icon
            ? "pl-10"
            : "pl-4"
          }
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

export default AddEmployee;