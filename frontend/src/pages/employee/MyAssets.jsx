import {
  useEffect,
} from "react";

import { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchMyAssets,
} from "../../redux/slices/assetSlice";

import MaintenanceRequestModal
  from "../../components/assets/MaintenanceRequestModal";

import {
  createMaintenanceRequest,
} from "../../redux/slices/maintenanceSlice";

import {
  createReturnRequest,
} from "../../redux/slices/returnRequestSlice";

import PageHeader from "../../components/layout/PageHeader";

import {
  toast,
} from "react-hot-toast";

const MyAssets = () => {

  const dispatch =
    useDispatch();

  const [
    selectedAsset,
    setSelectedAsset,
  ] = useState(null);

  const [
    showMaintenanceModal,
    setShowMaintenanceModal,
  ] = useState(false);

  const {
    assets,
    isLoading,
  } = useSelector(
    (state) => state.assets
  );

  useEffect(() => {
    dispatch(fetchMyAssets());
  }, [dispatch]);

  const handleReturnRequest = async (assetId) => {
    try {
      await dispatch(
        createReturnRequest(assetId)
      ).unwrap();

      toast.success(
        "Return request submitted"
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleMaintenanceRequest =
    async (issue) => {

      try {

        await dispatch(
          createMaintenanceRequest({
            assetId:
              selectedAsset._id,
            issue,
          })
        ).unwrap();

        toast.success(
          "Issue reported successfully"
        );

        setShowMaintenanceModal(
          false
        );

        setSelectedAsset(
          null
        );

      } catch (error) {

        toast.error(error);

      }
    };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading assets...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Assets"
        description="View and manage assets assigned to you"
      />

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold">
          My Asset Portfolio
        </h2>

        <p className="mt-2 text-blue-100">
          View assigned assets and submit return requests when needed.
        </p>
      </div>

      {assets.length === 0 ? (
        <div
          className="
    bg-white
    rounded-2xl
    border
    border-slate-200
    shadow-sm
    p-12
    text-center
  "
        >
          <h3 className="text-lg font-semibold text-slate-700">
            No Assets Assigned
          </h3>

          <p className="text-slate-500 mt-2">
            Assets assigned to you will appear here.
          </p>
        </div>
      ) : (
        <div
          className="
  bg-white
  rounded-2xl
  border
  border-slate-200
  shadow-sm
  overflow-hidden
"
        >
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="
  border-t
  border-slate-100
  hover:bg-slate-50
">
                <th className="p-4 text-left">
                  Asset
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Assigned Date
                </th>

                <th className="p-4 text-left">
                  Returned Date
                </th>

                <th className="p-4 text-left">
                  Asset Tag
                </th>

                <th className="p-4 text-center min-w-[220px]">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>
              {assets.map(
                (asset) => (
                  <tr
                    key={asset._id}
                    className="
  border-t
  border-slate-100
  hover:bg-slate-50
"
                  >
                    <td className="p-4">
                      {
                        asset.assetName
                      }
                    </td>

                    <td className="p-4">
                      {
                        asset.category
                      }
                    </td>

                    <td className="p-4">
                      <span
                        className="
                          px-3
                          py-1
                          rounded-full
                          bg-emerald-100
                          text-emerald-700
                          text-sm
                          font-medium
                        "
                      >
                        {
                          asset.status
                        }
                      </span>
                    </td>

                    <td className="p-4">
                      {asset.assignedDate
                        ? new Date(
                          asset.assignedDate
                        ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4">
                      {asset.returnedDate
                        ? new Date(
                          asset.returnedDate
                        ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4">
                      {
                        asset.assetTag
                      }
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            handleReturnRequest(
                              asset._id
                            )
                          }
                          className="
        bg-orange-500
        hover:bg-orange-600
        text-white
        px-4
        py-2
        rounded-lg
        text-sm
      "
                        >
                          Request Return
                        </button>

                        <button
                          onClick={() => {
                            setSelectedAsset(asset);
                            setShowMaintenanceModal(true);
                          }}
                          className="
        bg-amber-500
        hover:bg-amber-600
        text-white
        px-4
        py-2
        rounded-lg
        text-sm
      "
                        >
                          Report Issue
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {
        showMaintenanceModal && (
          <MaintenanceRequestModal
            asset={selectedAsset}
            onSubmit={
              handleMaintenanceRequest
            }
            onClose={() => {
              setShowMaintenanceModal(
                false
              );
              setSelectedAsset(
                null
              );
            }}
          />
        )
      }

    </div>

  );

};

export default MyAssets;