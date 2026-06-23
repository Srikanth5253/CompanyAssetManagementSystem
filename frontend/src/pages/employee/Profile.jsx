import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-hot-toast";

import {
  changePassword,
} from "../../redux/slices/authSlice";

import PageHeader from "../../components/layout/PageHeader";

import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiShield,
  FiLock,
  FiKey,
  FiEye,
  FiEyeOff,
  FiPhone,
} from "react-icons/fi";

const Profile = () => {
  const { user } = useSelector(
    (state) => state.auth
  );

  const dispatch =
    useDispatch();

  const [formData, setFormData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const isFormValid =
    formData.currentPassword &&
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword ===
    formData.confirmPassword;

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        formData.newPassword !==
        formData.confirmPassword
      ) {
        toast.error(
          "Passwords do not match"
        );

        return;
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

      if (
        !passwordRegex.test(
          formData.newPassword
        )
      ) {
        toast.error(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number"
        );

        return;
      }

      try {
        await dispatch(
          changePassword({
            currentPassword:
              formData.currentPassword,

            newPassword:
              formData.newPassword,
          })
        ).unwrap();

        toast.success(
          "Password updated successfully"
        );

        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        toast.error(error);
      }
    };

  return (
    <div className="space-y-8">

      <PageHeader
        title="Profile"
        description="View your account information and manage security settings"
      />

      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold">
          Employee Profile
        </h2>

        <p className="mt-2 text-emerald-100">
          View your information and keep your account secure.
        </p>
      </div>

      <div className="
bg-white
rounded-2xl
border
border-slate-200
shadow-sm
p-8
">

        <div className="flex items-center gap-4 mb-8">
          <div
            className="
    w-20 h-20
    rounded-full
    bg-gradient-to-r
    from-emerald-500
    to-cyan-500
    flex
    items-center
    justify-center
  "
          >
            <FiUser
              size={36}
              className="text-white"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {user?.name}
            </h2>

            <p className="text-slate-500 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="flex
    items-center
    gap-3
    p-4
    rounded-xl
    border
    border-slate-100
    hover:bg-slate-50
    transition-all">
            <FiUser className="text-emerald-600" />

            <div>
              <p className="text-sm text-slate-500">
                Employee ID
              </p>

              <p className="font-semibold">
                {user?.employeeId || "-"}
              </p>
            </div>
          </div>

          <div className="flex
    items-center
    gap-3
    p-4
    rounded-xl
    border
    border-slate-100
    hover:bg-slate-50
    transition-all">
            <FiMail className="text-blue-600" />

            <div>
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="font-semibold">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex
    items-center
    gap-3
    p-4
    rounded-xl
    border
    border-slate-100
    hover:bg-slate-50
    transition-all">
            <FiBriefcase className="text-amber-600" />

            <div>
              <p className="text-sm text-slate-500">
                Department
              </p>

              <p className="font-semibold">
                {user?.department || "-"}
              </p>
            </div>
          </div>

          <div className="flex
    items-center
    gap-3
    p-4
    rounded-xl
    border
    border-slate-100
    hover:bg-slate-50
    transition-all">
            <FiShield className="text-purple-600" />

            <div>
              <p className="text-sm text-slate-500">
                Role
              </p>

              <p className="font-semibold capitalize">
                {user?.role}
              </p>
            </div>
          </div>

          <div className="flex
    items-center
    gap-3
    p-4
    rounded-xl
    border
    border-slate-100
    hover:bg-slate-50
    transition-all">
            <FiBriefcase className="text-cyan-600" />

            <div>
              <p className="text-sm text-slate-500">
                Designation
              </p>

              <p className="font-semibold">
                {user?.designation || "-"}
              </p>
            </div>
          </div>

          <div className="flex
    items-center
    gap-3
    p-4
    rounded-xl
    border
    border-slate-100
    hover:bg-slate-50
    transition-all">
            <FiPhone className="text-pink-600" />

            <div>
              <p className="text-sm text-slate-500">
                Phone
              </p>

              <p className="font-semibold">
                {user?.phone || "-"}
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="
bg-white
rounded-2xl
border
border-slate-200
shadow-sm
p-8
">

        <div className="flex items-center gap-3 mb-6">
          <FiLock
            size={24}
            className="text-emerald-600"
          />

          <h2 className="text-2xl font-bold">
            Change Password
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label
              className="
                block
                text-sm
                font-medium
                text-slate-600
                mb-2
              "
            >
              Current Password
            </label>

            <div className="relative">

              <input
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="
      w-full
      border
      border-slate-300
      rounded-xl
      px-4
      py-3
      pr-12
      focus:outline-none
      focus:ring-2
      focus:ring-emerald-500
    "
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword(
                    !showCurrentPassword
                  )
                }
                className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-slate-500
    "
              >
                {showCurrentPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>

            </div>
          </div>

          <div>
            <label
              className="
                block
                text-sm
                font-medium
                text-slate-600
                mb-2
              "
            >
              New Password
            </label>

            <div className="relative">

              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                name="newPassword"
                value={
                  formData.newPassword
                }
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-slate-300
                  rounded-xl
                  px-4
                  py-3
                  pr-12
                  focus:outline-none
                  focus:ring-2
                  focus:ring-emerald-500
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(
                    !showNewPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              >
                {showNewPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>

            </div>

            <p className="text-sm text-slate-500 mt-1">
              Password must contain at least 8 characters,
              one uppercase letter, one lowercase letter
              and one number.
            </p>

            {formData.newPassword
              .length > 0 && (
                <p
                  className={`text-sm mt-1 ${formData
                    .newPassword
                    .length >= 6
                    ? "text-emerald-600"
                    : "text-red-600"
                    }`}
                >
                  {formData
                    .newPassword
                    .length >= 6
                    ? "Strong Password"
                    : "Password Too Short"}
                </p>
              )}
          </div>

          <div>
            <label
              className="
                block
                text-sm
                font-medium
                text-slate-600
                mb-2
              "
            >
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="
      w-full
      border
      border-slate-300
      rounded-xl
      px-4
      py-3
      pr-12
      focus:outline-none
      focus:ring-2
      focus:ring-emerald-500
    "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-slate-500
    "
              >
                {showConfirmPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>

            </div>

            {formData.confirmPassword &&
              formData.newPassword !==
              formData.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  Passwords do not
                  match
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              font-medium
              transition
              ${isFormValid
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-slate-300 cursor-not-allowed text-slate-500"
              }
            `}
          >
            <FiKey />
            Update Password
          </button>

        </form>
      </div>

    </div>
  );
};

export default Profile;