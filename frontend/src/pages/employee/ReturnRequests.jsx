import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMyReturnRequests,
} from "../../redux/slices/returnRequestSlice";

import PageHeader from "../../components/layout/PageHeader";

const ReturnRequests = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] =
    useState(1);
  const requestsPerPage = 5;

  const {
    returnRequests,
    isLoading,
  } = useSelector(
    (state) => state.returnRequests
  );

  const lastIndex =
    currentPage *
    requestsPerPage;

  const firstIndex =
    lastIndex -
    requestsPerPage;

  const currentRequests =
    returnRequests?.slice(
      firstIndex,
      lastIndex
    ) || [];

  const totalPages =
    Math.ceil(
      (returnRequests?.length || 0) /
      requestsPerPage
    );

  useEffect(() => {
    dispatch(
      getMyReturnRequests()
    );
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Return Requests"
        description="Track the status of your asset return requests"
      />

      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold">
          Asset Returns
        </h2>

        <p className="mt-2 text-orange-100">
          Track and monitor the approval status of your return requests.
        </p>
      </div>

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
        {returnRequests?.length === 0 ? (

          <div className="p-12 text-center">

            <h3 className="text-lg font-semibold text-slate-700">
              No Return Requests Found
            </h3>

            <p className="text-slate-500 mt-2">
              Your return requests will appear here.
            </p>

          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">
                  Asset Type
                </th>

                <th className="p-4 text-left">
                  Asset Tag
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Requested Date
                </th>
              </tr>
            </thead>

            <tbody>

              {currentRequests.map(
                (request) => (
                  <tr
                    key={request._id}
                    className="
  border-t
  border-slate-100
  hover:bg-slate-50
"
                  >
                    <td className="p-4">
                      {
                        request.asset
                          ?.assetName
                      }
                    </td>

                    <td className="p-4">
                      {request.asset?.assetTag}
                    </td>

                    <td className="p-4">

                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium

                        ${request.status ===
                            "Approved"
                            ? "bg-green-100 text-green-700"
                            : request.status ===
                              "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                      `}
                      >
                        {
                          request.status
                        }
                      </span>

                    </td>

                    <td className="p-4">
                      {new Date(
                        request.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>
        )}

        <div className="flex items-center justify-between p-4 border-t border-slate-200">

          <p className="text-sm text-slate-500">
            Showing {returnRequests?.length ? firstIndex + 1 : 0} -
            {Math.min(
              lastIndex,
              returnRequests?.length || 0
            )} of {returnRequests?.length || 0}
          </p>

          <div className="flex gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
              className="
        px-4
        py-2
        rounded-lg
        border
        border-slate-300
        disabled:opacity-50
      "
            >
              Previous
            </button>

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
              className="
        px-4
        py-2
        rounded-lg
        border
        border-slate-300
        disabled:opacity-50
      "
            >
              Next
            </button>

          </div>

        </div>
        
      </div>
    </div>
  );
};

export default ReturnRequests;