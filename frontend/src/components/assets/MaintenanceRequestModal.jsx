import { useState } from "react";
import {
  FiTool,
  FiX,
} from "react-icons/fi";

const MaintenanceRequestModal = ({
  asset,
  onSubmit,
  onClose,
}) => {

  const [issue, setIssue] =
    useState("");

  const handleSubmit =
    () => {

      if (!issue.trim()) {
        return;
      }

      onSubmit(issue);
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl">

        <div className="flex items-center justify-between mb-5">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">

              <FiTool className="text-amber-600" />

            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Report Maintenance Issue
            </h2>

          </div>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <FiX size={20} />
          </button>

        </div>

        <div className="mb-5">

          <p className="text-sm text-slate-500">
            Asset
          </p>

          <p className="font-semibold text-slate-800">
            {asset?.assetName}
          </p>

          <p className="text-sm text-slate-500">
            {asset?.assetTag}
          </p>

        </div>

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Issue Description
          </label>

          <textarea
            rows={5}
            value={issue}
            onChange={(e) =>
              setIssue(
                e.target.value
              )
            }
            placeholder="Example: Battery not charging, keyboard keys not working..."
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              p-3
              focus:outline-none
              focus:ring-2
              focus:ring-amber-500
            "
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="
              px-4
              py-2
              border
              border-slate-300
              rounded-xl
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-4
              py-2
              bg-amber-600
              hover:bg-amber-700
              text-white
              rounded-xl
            "
          >
            Submit Request
          </button>

        </div>

      </div>

    </div>
  );
};

export default MaintenanceRequestModal;