import {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import {
    FiSearch,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiEye,
    FiUserPlus,
    FiArchive,
} from "react-icons/fi";

import {
    fetchAssets,
    removeAsset,
    retireAsset,
} from "../../redux/slices/assetSlice";

import PageHeader from "../../components/layout/PageHeader";
import { fetchEmployees } from "../../redux/slices/employeeSlice";
import AssetStats from "../../components/assets/AssetStats";
import AssetDetails from "../../components/assets/AssetDetails"
import EditAsset from "../../components/assets/EditAsset";
import DeleteAsset from "../../components/assets/DeleteAsset";
import AssignAssetModal from "../../components/assets/AssignAsset"
import RetireAssetModal from "../../components/assets/RetireAssetModal";

const Assets = () => {

    const dispatch =
        useDispatch();

    const navigate = useNavigate();

    const {
        assets,
        isLoading,
    } = useSelector(
        (state) => state.assets
    );

    const [
        selectedAsset,
        setSelectedAsset,
    ] = useState(null);

    const [
        showDetailsModal,
        setShowDetailsModal,
    ] = useState(false);

    const [search, setSearch] =
        useState("");

    const [
        statusFilter,
        setStatusFilter,
    ] = useState("all");

    const [
        currentPage,
        setCurrentPage,
    ] = useState(1);

    const assetsPerPage = 5;

    const [
        showEditModal,
        setShowEditModal,
    ] = useState(false);

    const [
        showDeleteModal,
        setShowDeleteModal,
    ] = useState(false);

    const [showAssignModal, setShowAssignModal] =
        useState(false);

    const [
  showRetireModal,
  setShowRetireModal,
] = useState(false);

    useEffect(() => {
        dispatch(fetchAssets());
        dispatch(fetchEmployees());
    }, [dispatch]);

    const filteredAssets = assets
        .filter((asset) => {
            const matchesSearch =
                asset.assetName?.toLowerCase().includes(search.toLowerCase()) ||
                asset.assetTag?.toLowerCase().includes(search.toLowerCase()) ||
                asset.serialNumber?.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "all"
                    ? true
                    : asset.status === statusFilter;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => a.assetTag.localeCompare(b.assetTag));

    const lastIndex =
        currentPage *
        assetsPerPage;

    const firstIndex =
        lastIndex -
        assetsPerPage;

    const currentAssets =
        filteredAssets.slice(
            firstIndex,
            lastIndex
        );

    const totalPages =
        Math.ceil(
            filteredAssets.length /
            assetsPerPage
        );

    const getStatusBadge = (
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

    const handleDelete =
        async () => {
            try {
                await dispatch(
                    removeAsset(
                        selectedAsset._id
                    )
                ).unwrap();

                toast.success(
                    "Asset deleted successfully"
                );

                dispatch(
                    fetchAssets()
                );

                setShowDeleteModal(
                    false
                );

                setSelectedAsset(
                    null
                );
            } catch (error) {
                toast.error(error);
            }
        };

    const handleRetire =
  async (reason) => {

    try {

      await dispatch(
        retireAsset({
          id:
            selectedAsset._id,
          reason,
        })
      ).unwrap();

      toast.success(
        "Asset retired successfully"
      );

      dispatch(
        fetchAssets()
      );

      setShowRetireModal(
        false
      );

      setSelectedAsset(
        null
      );

    } catch (error) {

      toast.error(error);

    }
  };

    return (
        <div className="space-y-8">

            <PageHeader
                title="Assets"
                description="Manage company assets"
            >
                <button
                    onClick={() =>
                        navigate("/dashboard/assets/add")
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
      shadow-sm
    "
                >
                    <FiPlus />
                    Add Asset
                </button>
            </PageHeader>

            <AssetStats
                assets={assets}
            />

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">

                <div className="flex flex-col lg:flex-row gap-4">

                    <div className="relative flex-1">

                        <FiSearch
                            className="
            absolute
            left-4
            top-3.5
            text-slate-400
          "
                        />

                        <input
                            type="text"
                            placeholder="Search assets..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
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
          "
                        />

                    </div>

                    <select
                        value={
                            statusFilter
                        }
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                        className="
          px-4
          py-3
          rounded-xl
          border
          border-slate-300
        "
                    >
                        <option value="all">
                            All Status
                        </option>

                        <option value="available">
                            Available
                        </option>

                        <option value="assigned">
                            Assigned
                        </option>

                        <option value="maintenance">
                            Maintenance
                        </option>

                        <option value="retired">
                            Retired
                        </option>

                    </select>

                    <button
                        onClick={() => {
                            setSearch("");
                            setStatusFilter(
                                "all"
                            );
                        }}
                        className="
          px-4
          py-3
          rounded-xl
          border
          border-slate-300
        "
                    >
                        View All
                    </button>

                </div>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-50">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Asset Tag
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Asset Name
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Assigned To
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {currentAssets.map(
                                (asset) => (
                                    <tr
                                        key={
                                            asset._id
                                        }
                                        className="border-t border-slate-200"
                                    >

                                        <td className="px-6 py-4 font-medium">
                                            {
                                                asset.assetTag
                                            }
                                        </td>

                                        <td className="px-6 py-4">
                                            {
                                                asset.assetName
                                            }
                                        </td>

                                        <td className="px-6 py-4">
                                            {
                                                asset.category
                                            }
                                        </td>

                                        <td className="px-6 py-4 ">

                                            <span
                                                className={`
                      inline-flex
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                      ${getStatusBadge(
                                                    asset.status
                                                )}
                    `}
                                            >
                                                {
                                                    asset.status
                                                }
                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            {asset.assignedTo
                                                ?.name ||
                                                "-"}

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() => {
                                                        setSelectedAsset(asset);
                                                        setShowDetailsModal(true);
                                                    }}
                                                    className="
    p-2
    rounded-lg
    bg-slate-100
    text-slate-700
  "
                                                >
                                                    <FiEye />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setSelectedAsset(asset);
                                                        setShowEditModal(true);
                                                    }}
                                                    className="
    p-2
    rounded-lg
    bg-emerald-100
    text-emerald-700
  "
                                                >
                                                    <FiEdit2 />
                                                </button>

                                                {
  asset.status === "available" && (
    <>
      <button
        onClick={() => {
          setSelectedAsset(asset);
          setShowAssignModal(true);
        }}
        className="
          p-2
          rounded-lg
          bg-blue-100
          text-blue-700
        "
      >
        <FiUserPlus />
      </button>

      <button
        onClick={() => {
          setSelectedAsset(asset);
          setShowRetireModal(true);
        }}
        className="
          p-2
          rounded-lg
          bg-red-100
          text-red-700
        "
        title="Retire Asset"
      >
        <FiArchive />
      </button>
    </>
  )
}

                                                <button
                                                    onClick={() => {
                                                        setSelectedAsset(asset);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="p-2 rounded-lg bg-red-100 text-red-700">
                                                    <FiTrash2 />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>

                <div className="flex items-center justify-between p-4 border-t border-slate-200">

                    <p className="text-sm text-slate-500">
                        Showing{" "}
                        {filteredAssets.length
                            ? firstIndex + 1
                            : 0}
                        -
                        {Math.min(
                            lastIndex,
                            filteredAssets.length
                        )}{" "}
                        of{" "}
                        {
                            filteredAssets.length
                        }
                    </p>

                    <div className="flex gap-2">

                        <button
                            disabled={
                                currentPage === 1
                            }
                            onClick={() =>
                                setCurrentPage(
                                    currentPage -
                                    1
                                )
                            }
                            className="
            px-4
            py-2
            border
            rounded-lg
            disabled:opacity-50
          "
                        >
                            Previous
                        </button>

                        <button
                            disabled={
                                currentPage ===
                                totalPages
                            }
                            onClick={() =>
                                setCurrentPage(
                                    currentPage +
                                    1
                                )
                            }
                            className="
            px-4
            py-2
            border
            rounded-lg
            disabled:opacity-50
          "
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

            {
                showDetailsModal && (
                    <AssetDetails
                        asset={selectedAsset}
                        onClose={() => {
                            setShowDetailsModal(false);
                            setSelectedAsset(null);
                        }}
                    />
                )
            }

            {
                showEditModal && (
                    <EditAsset
                        asset={selectedAsset}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedAsset(null);
                        }}
                    />
                )
            }

            {
                showDeleteModal && (
                    <DeleteAsset
                        asset={selectedAsset}
                        onConfirm={
                            handleDelete
                        }
                        onClose={() => {
                            setShowDeleteModal(false);
                            setSelectedAsset(null);
                        }}
                    />
                )
            }

            {
                showAssignModal && (
                    <AssignAssetModal
                        asset={selectedAsset}
                        onClose={() => {
                            setShowAssignModal(false);
                            setSelectedAsset(null);
                        }}
                    />
                )
            }

            {
  showRetireModal && (
    <RetireAssetModal
      asset={selectedAsset}
      onConfirm={handleRetire}
      onClose={() => {
        setShowRetireModal(false);
        setSelectedAsset(null);
      }}
    />
  )
}

        </div>

    );
};

export default Assets;
