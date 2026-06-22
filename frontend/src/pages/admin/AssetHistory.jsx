import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchHistory,
} from "../../redux/slices/historySlice";

import PageHeader from "../../components/layout/PageHeader";

const AssetHistory = () => {
  const dispatch =
    useDispatch();

  const { history } =
    useSelector(
      (state) =>
        state.history
    );

  useEffect(() => {
    dispatch(
      fetchHistory()
    );
  }, [dispatch]);

  return (
    <div className="space-y-8">

      <PageHeader
        title="Asset History"
        description="Track asset assignments and return activities"
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-50 border-b border-slate-200">

              <th className="p-4 text-left">
                Asset
              </th>

              <th className="p-4 text-left">
                Performed By
              </th>

              <th className="p-4 text-left">
                Action
              </th>

              <th className="p-4 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {history?.map(
              (item) => (
                <tr
                  key={
                    item._id
                  }
                  className="border-b"
                >

                  <td className="p-4">
                    {
                      item.asset
                        ?.assetName
                    }
                  </td>

                  <td className="p-4">

                    <div>
                      <p className="font-semibold">
                        {
                          item.employee
                            ?.name || "-"
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        {
                          item.employee
                            ?.employeeId
                        }
                      </p>
                    </div>

                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${item.action ===
                          "Assigned"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {
                        item.action
                      }
                    </span>

                  </td>

                  <td className="p-4">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AssetHistory;