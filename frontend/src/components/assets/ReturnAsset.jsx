import {
  FiRotateCcw,
  FiX,
} from "react-icons/fi";

const ReturnAsset= ({
  asset,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold text-slate-800">
            Return Asset
          </h2>

          <button onClick={onClose}>
            <FiX />
          </button>

        </div>

        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4">

            <FiRotateCcw
              size={28}
              className="text-orange-600"
            />

          </div>

          <p className="text-slate-700">
            Return asset
          </p>

          <p className="font-semibold mt-2">
            {asset?.assetName}
          </p>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="
              px-4 py-2
              border border-slate-300
              rounded-xl
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2
              bg-orange-600
              hover:bg-orange-700
              text-white
              rounded-xl
            "
          >
            Return Asset
          </button>

        </div>

      </div>

    </div>
  );
};

export default ReturnAsset;