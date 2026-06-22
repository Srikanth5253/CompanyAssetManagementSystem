import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
    FiPackage,
    FiHash,
    FiCalendar,
    FiFileText,
} from "react-icons/fi";

import {
    addAsset,
    fetchAssets,
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

const AddAsset = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            assetName: "",
            assetTag: "",
            category: "",
            serialNumber: "",
            purchaseDate: "",
            notes: "",
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
                    addAsset(formData)
                ).unwrap();

                toast.success(
                    "Asset created successfully"
                );

                dispatch(
                    fetchAssets()
                );

                navigate("/dashboard/assets");

            } catch (error) {
                toast.error(
                    error ||
                    "Failed to create asset"
                );
            }
        };


    return (

        <div className="max-w-6xl mx-auto">

            <div className="overflow-hidden">

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
                            onClick={() => navigate("/dashboard/assets")}
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
                            Create Asset
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

export default AddAsset;

