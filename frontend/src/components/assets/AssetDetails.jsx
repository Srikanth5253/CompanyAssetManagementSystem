import {
    FiX,
    FiPackage,
    FiHash,
    FiCalendar,
    FiTag,
    FiUser,
    FiFileText,
} from "react-icons/fi";

const AssetDetails = ({
    asset,
    onClose,
}) => {
    if (!asset) return null;

    const formatDate = (
        date
    ) => {
        if (!date)
            return "N/A";


        return new Date(
            date
        ).toLocaleDateString();


    };

    const getStatusColor = (
        status
    ) => {
        switch (status) {
            case "available":
                return "bg-emerald-100 text-emerald-700";


            case "assigned":
                return "bg-blue-100 text-blue-700";

            case "maintenance":
                return "bg-amber-100 text-amber-700";

            case "retired":
                return "bg-red-100 text-red-700";

            default:
                return "bg-slate-100 text-slate-700";
        }


    };

    return (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

        <div className="bg-white rounded-3xl w-full max-w-3xl
    max-h-[90vh]
    overflow-y-auto
    shadow-2xl">

            <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-bold">
                        Asset Details
                    </h2>

                    <p className="text-slate-300 text-sm mt-1">
                        Asset information overview
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="text-slate-300 hover:text-white"
                >
                    <FiX size={22} />
                </button>

            </div>

            <div className="p-6">

                <div className="flex items-center gap-4 mb-8">

                    <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center">

                        <FiPackage
                            size={36}
                            className="text-emerald-600"
                        />

                    </div>

                    <div>

                        <h3 className="text-2xl font-bold text-slate-800">
                            {asset.assetName}
                        </h3>

                        <p className="text-slate-500">
                            {asset.assetTag}
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <InfoCard
                        icon={<FiHash />}
                        label="Asset Tag"
                        value={
                            asset.assetTag
                        }
                    />

                    <InfoCard
                        icon={<FiTag />}
                        label="Category"
                        value={
                            asset.category
                        }
                    />

                    <InfoCard
                        icon={<FiHash />}
                        label="Serial Number"
                        value={
                            asset.serialNumber ||
                            "N/A"
                        }
                    />

                    <InfoCard
                        icon={
                            <FiCalendar />
                        }
                        label="Purchase Date"
                        value={formatDate(
                            asset.purchaseDate
                        )}
                    />

                    <InfoCard
                        icon={<FiUser />}
                        label="Assigned To"
                        value={
                            asset.assignedTo
                                ?.name ||
                            "Not Assigned"
                        }
                    />

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">

                        <p className="text-sm text-slate-500 mb-2">
                            Status
                        </p>

                        <span
                            className={`
              inline-flex
              px-3
              py-1
              rounded-full
              text-sm
              font-medium
              ${getStatusColor(
                                asset.status
                            )}
            `}
                        >
                            {asset.status}
                        </span>

                    </div>

                </div>

                <div className="mt-5 bg-slate-50 border border-slate-200 rounded-2xl p-4">

                    <div className="flex items-center gap-2 mb-2">

                        <FiFileText className="text-emerald-600" />

                        <p className="font-medium text-slate-700">
                            Notes
                        </p>

                    </div>

                    <p className="text-slate-600">
                        {asset.notes ||
                            "No notes available"}
                    </p>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">

                    <InfoCard
                        label="Created At"
                        value={formatDate(
                            asset.createdAt
                        )}
                    />

                    <InfoCard
                        label="Updated At"
                        value={formatDate(
                            asset.updatedAt
                        )}
                    />

                </div>

            </div>

        </div>

    </div>


    );
};

const InfoCard = ({
    icon,
    label,
    value,
}) => (

    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">


        <div className="flex items-center gap-2 mb-2">

            {icon && (
                <span className="text-emerald-600">
                    {icon}
                </span>
            )}

            <p className="text-sm text-slate-500">
                {label}
            </p>

        </div>

        <p className="font-semibold text-slate-800">
            {value}
        </p>


    </div>
);

export default AssetDetails;
