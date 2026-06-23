import { useEffect, useState } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import PageHeader
    from "../../components/layout/PageHeader";

import {
    fetchAllMaintenanceRequests,
    startRepair,
    completeRepair,
} from "../../redux/slices/maintenanceSlice";

import {
    fetchAssets,
} from "../../redux/slices/assetSlice";

import {
    fetchDashboardStats,
} from "../../redux/slices/dashboardSlice";

import { toast } from "react-hot-toast";

const MaintenanceRequests = () => {

    const dispatch =
        useDispatch();

    const [currentPage, setCurrentPage] =
        useState(1);
    const requestsPerPage = 5;

    const {
        maintenanceRequests,
        isLoading,
    } = useSelector(
        (state) => state.maintenance
    );

    const lastIndex =
        currentPage *
        requestsPerPage;

    const firstIndex =
        lastIndex -
        requestsPerPage;

    const currentRequests =
        maintenanceRequests?.slice(
            firstIndex,
            lastIndex
        ) || [];

    const totalPages =
        Math.ceil(
            (maintenanceRequests?.length || 0) /
            requestsPerPage
        );

    useEffect(() => {

        dispatch(
            fetchAllMaintenanceRequests()
        );

    }, [dispatch]);

    const handleStartRepair =
        async (id) => {

            try {

                await dispatch(
                    startRepair(id)
                ).unwrap();

                await dispatch(
                    fetchAllMaintenanceRequests()
                );

                await dispatch(
                    fetchAssets()
                );

                await dispatch(
                    fetchDashboardStats()
                );

                toast.success(
                    "Repair started"
                );

            } catch (error) {

                toast.error(error);

            }
        };

    const handleCompleteRepair =
        async (id) => {

            try {

                await dispatch(
                    completeRepair(id)
                ).unwrap();

                await dispatch(
                    fetchAllMaintenanceRequests()
                );

                await dispatch(
                    fetchAssets()
                );

                await dispatch(
                    fetchDashboardStats()
                );

                toast.success(
                    "Repair completed"
                );

            } catch (error) {

                toast.error(error);

            }
        };

    if (isLoading) {
        return (
            <div className="text-center py-10">
                Loading maintenance requests...
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <PageHeader
                title="Maintenance Requests"
                description="Manage asset maintenance requests"
            />

            <div className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        overflow-hidden
      ">

                <table className="w-full">

                    <thead className="bg-slate-50">

                        <tr>

                            <th className="p-4 text-left">
                                Employee
                            </th>

                            <th className="p-4 text-left">
                                Asset
                            </th>

                            <th className="p-4 text-left">
                                Asset Tag
                            </th>

                            <th className="p-4 text-left">
                                Issue
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Reported Date
                            </th>

                            <th className="p-4 text-left">
                                Action
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
                                        {request.employee?.name}
                                    </td>

                                    <td className="p-4">
                                        {request.asset?.assetName}
                                    </td>

                                    <td className="p-4">
                                        {request.asset?.assetTag}
                                    </td>

                                    <td className="p-4">
                                        {request.issue}
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
                                                    "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : request.status ===
                                                        "In Progress"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }
                      `}
                                        >
                                            {request.status}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        {new Date(
                                            request.createdAt
                                        ).toLocaleDateString()}

                                    </td>

                                    <td className="p-4">

                                        <div className="flex gap-2">

                                            {request.status ===
                                                "Pending" && (

                                                    <button
                                                        onClick={() =>
                                                            handleStartRepair(
                                                                request._id
                                                            )
                                                        }
                                                        className="
    px-3
    py-2
    rounded-lg
    bg-blue-600
    text-white
  "
                                                    >
                                                        Start Repair
                                                    </button>

                                                )}

                                            {request.status ===
                                                "In Progress" && (

                                                    <button
                                                        onClick={() =>
                                                            handleCompleteRepair(
                                                                request._id
                                                            )
                                                        }
                                                        className="
    px-3
    py-2
    rounded-lg
    bg-emerald-600
    text-white
  "
                                                    >
                                                        Mark Fixed
                                                    </button>

                                                )}

                                        </div>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

                <div className="flex items-center justify-between p-4 border-t border-slate-200">

                    <p className="text-sm text-slate-500">
                        Showing {maintenanceRequests?.length ? firstIndex + 1 : 0} -
                        {Math.min(
                            lastIndex,
                            maintenanceRequests?.length || 0
                        )} of {maintenanceRequests?.length || 0}
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

export default MaintenanceRequests;