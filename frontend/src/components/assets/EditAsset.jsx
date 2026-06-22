import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
    FiX,
    FiPackage,
    FiHash,
    FiCalendar,
    FiFileText,
} from "react-icons/fi";

import {
    fetchAssets,
    editAsset,
} from "../../redux/slices/assetSlice";

const categories = [
    "Laptop",
    "Desktop",
    "Monitor",
    "Printer",
    "Mobile",
    "Keyboard",
    "Mouse",
    "Other",
];

const EditAsset = ({
    asset,
    onClose,
}) => {
    const dispatch =
        useDispatch();

    const [formData, setFormData] =
    useState({
        assetName: asset?.assetName || "",
        assetTag: asset?.assetTag || "",
        category: asset?.category || "",
        serialNumber:
            asset?.serialNumber || "",
        purchaseDate:
            asset?.purchaseDate
                ?.split("T")[0] || "",
        notes: asset?.notes || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit =
        async (e) => {
            e.preventDefault();


            try {
                await dispatch(
                    editAsset({
        id: asset._id,
        assetData: formData,
    })
                ).unwrap();

                toast.success(
                    "Asset updated successfully"
                );

                dispatch(
                    fetchAssets()
                );

                onClose();
            } catch (error) {
                toast.error(
                    error ||
                    "Failed to update asset"
                );
            }
        };


    return (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">


        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Edit Asset
                    </h2>

                    <p className="text-slate-500 text-sm mt-1">
                        Update asset information
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="text-slate-500 hover:text-slate-700"
                >
                    <FiX size={22} />
                </button>

            </div>

            <form
                onSubmit={handleSubmit}
                className="p-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <Input
                        icon={<FiPackage />}
                        label="Asset Name"
                        name="assetName"
                        value={
                            formData.assetName
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <Input
                        icon={<FiHash />}
                        label="Asset Tag"
                        name="assetTag"
                        value={
                            formData.assetTag
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Category
                        </label>

                        <select
                            name="category"
                            value={
                                formData.category
                            }
                            onChange={
                                handleChange
                            }
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
              focus:outline-none
            "
                        >
                            <option value="">
                                Select Category
                            </option>

                            {categories.map(
                                (
                                    category
                                ) => (
                                    <option
                                        key={
                                            category
                                        }
                                        value={
                                            category
                                        }
                                    >
                                        {category}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <Input
                        label="Serial Number"
                        name="serialNumber"
                        value={
                            formData.serialNumber
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <Input
                        icon={
                            <FiCalendar />
                        }
                        type="date"
                        label="Purchase Date"
                        name="purchaseDate"
                        value={
                            formData.purchaseDate
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>

                <div className="mt-5">

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Notes
                    </label>

                    <textarea
                        rows="4"
                        name="notes"
                        value={
                            formData.notes
                        }
                        onChange={
                            handleChange
                        }
                        className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-slate-50
            p-4
            focus:ring-2
            focus:ring-emerald-500
            focus:outline-none
          "
                        placeholder="Asset notes..."
                    />

                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        type="button"
                        onClick={onClose}
                        className="
            px-5
            py-3
            border
            border-slate-300
            rounded-xl
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
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            rounded-xl
            font-medium
          "
                    >
                        Update Asset
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
      focus:outline-none
    `}
            />

        </div>

    </div>
);

export default EditAsset;
