import { useState } from "react";

const RetireAssetModal = ({
  asset,
  onConfirm,
  onClose,
}) => {

  const [reason, setReason] =
    useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          Retire Asset
        </h2>

        <p className="text-slate-600 mb-4">
          {asset?.assetName}
        </p>

        <textarea
          rows={4}
          value={reason}
          onChange={(e) =>
            setReason(
              e.target.value
            )
          }
          placeholder="Reason for retirement..."
          className="
            w-full
            border
            rounded-xl
            p-3
          "
        />

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={onClose}
            className="
              px-4
              py-2
              border
              rounded-xl
            "
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onConfirm(reason)
            }
            className="
              px-4
              py-2
              bg-red-600
              text-white
              rounded-xl
            "
          >
            Retire Asset
          </button>

        </div>

      </div>

    </div>
  );
};

export default RetireAssetModal;