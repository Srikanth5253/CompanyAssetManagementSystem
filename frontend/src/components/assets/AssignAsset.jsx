import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  FiX,
  FiUser,
  FiPackage,
  FiUserPlus,
} from "react-icons/fi";

import {
  assignAssetToEmployee,
  fetchAssets,
} from "../../redux/slices/assetSlice";

const AssignAsset = ({
  asset,
  onClose,
}) => {
  const dispatch =
    useDispatch();

  const {
    employees,
  } = useSelector(
    (state) => state.employees
  );

  const [employeeId, setEmployeeId] =
    useState("");

  const handleAssign =
    async () => {
      if (!employeeId) {
        return toast.error(
          "Please select an employee"
        );
      }

      try {
        await dispatch(
          assignAssetToEmployee({
            assetId: asset._id,
            employeeId,
          })
        ).unwrap();

        await dispatch(
          fetchAssets()
        );

        toast.success(
          "Asset assigned successfully"
        );

        onClose();
      } catch (error) {
        toast.error(
          error ||
            "Failed to assign asset"
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">

        {/* Header */}

        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Assign Asset
            </h2>

            <p className="text-slate-300 text-sm mt-1">
              Assign asset to an employee
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white"
          >
            <FiX size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-6">

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-3">

              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">

                <FiPackage
                  size={22}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Asset
                </p>

                <h3 className="font-bold text-slate-800">
                  {asset?.assetName}
                </h3>

              </div>

            </div>

            <div className="text-sm text-slate-600">

              Asset Tag:
              <span className="font-medium ml-2">
                {asset?.assetTag}
              </span>

            </div>

          </div>

          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee
            </label>

            <div className="relative">

              <FiUser className="absolute left-4 top-4 text-slate-400" />

              <select
                value={employeeId}
                onChange={(e) =>
                  setEmployeeId(
                    e.target.value
                  )
                }
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  bg-slate-50
                  focus:ring-2
                  focus:ring-emerald-500
                  focus:border-emerald-500
                  focus:outline-none
                "
              >
                <option value=""  disabled hidden>
                  Select an Employee
                </option>

                {employees
                  ?.filter(
                    (employee) =>
                      employee.status ===
                      "active"
                  )
                  .map(
                    (
                      employee
                    ) => (
                      <option
                        key={
                          employee._id
                        }
                        value={
                          employee._id
                        }
                      >
                        {
                          employee.employeeId
                        }
                        {" - "}
                        {
                          employee.name
                        }
                        {" ("}
                        {
                          employee.department
                        }
                        {")"}
                      </option>
                    )
                  )}

              </select>

            </div>

          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

            <p className="text-sm text-blue-700">

              Once assigned, the asset
              status will automatically
              change to
              <span className="font-semibold ml-1">
                Assigned
              </span>

            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-3">

          <button
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
            onClick={
              handleAssign
            }
            className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-emerald-600
              hover:bg-emerald-700
              text-white
              font-medium
            "
          >
            <FiUserPlus />
            Assign Asset
          </button>

        </div>

      </div>

    </div>
  );
};

export default AssignAsset;