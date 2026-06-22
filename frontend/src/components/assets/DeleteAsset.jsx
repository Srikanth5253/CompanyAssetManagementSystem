import {
  FiTrash2,
  FiX,
} from "react-icons/fi";

const DeleteAsset = ({
  asset,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold text-slate-800">
            Delete Asset
          </h2>

          <button onClick={onClose}>
            <FiX />
          </button>

        </div>

        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">

            <FiTrash2
              size={28}
              className="text-red-600"
            />

          </div>

          <p className="text-slate-700">
            Are you sure you want
            to delete
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

export default DeleteAsset;