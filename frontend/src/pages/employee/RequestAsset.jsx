import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    createRequest,
    getMyRequests,
} from "../../redux/slices/requestSlice";

import PageHeader from "../../components/layout/PageHeader";

import {
    toast,
} from "react-hot-toast";

import { useState, useEffect } from "react";

import {
    FiSend,
    FiPackage,
} from "react-icons/fi";

const RequestAsset = () => {
    const dispatch = useDispatch();

    const { requests } = useSelector(
        (state) => state.requests
    );

    const [currentPage, setCurrentPage] =
        useState(1);

    const requestsPerPage = 5;

    const lastIndex =
        currentPage *
        requestsPerPage;

    const firstIndex =
        lastIndex -
        requestsPerPage;

    const currentRequests =
        requests?.slice(
            firstIndex,
            lastIndex
        ) || [];

    const totalPages =
        Math.ceil(
            (requests?.length || 0) /
            requestsPerPage
        );

    const [formData, setFormData] =
        useState({
            assetType: "",
            reason: "",
            priority: "Medium",
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(
                createRequest(formData)
            ).unwrap();

            await dispatch(
                getMyRequests()
            );

            toast.success(
                "Request submitted successfully"
            );

            setFormData({
                assetType: "",
                reason: "",
                priority: "Medium",
            });
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        dispatch(
            getMyRequests()
        );
    }, [dispatch]);

    return (
        <div className="space-y-8">

            <PageHeader
                title="Request Asset"
                description="Submit requests for company assets and track their status"
            />

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                <h2 className="text-2xl font-bold">
                    Asset Requests
                </h2>

                <p className="mt-2 text-blue-100">
                    Request assets required for your work and track approval status.
                </p>
            </div>

            {/* Request Form */}

            <div
                className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-sm
          p-8
        "
            >
                <div className="flex items-center gap-3 mb-6">
                    <FiPackage
                        size={24}
                        className="text-blue-600"
                    />

                    <h2 className="text-xl font-semibold">
                        New Request
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="block mb-2 font-medium">
                            Asset Type
                        </label>

                        <input
                            type="text"
                            name="assetType"
                            value={formData.assetType}
                            onChange={handleChange}
                            placeholder="Laptop"
                            className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Reason
                        </label>

                        <textarea
                            rows="4"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            placeholder="Need a laptop for project development"
                            className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="
              flex
              items-center
              gap-2
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-medium
              transition-all
              shadow-sm
            "
                    >
                        <FiSend />
                        Submit Request
                    </button>
                </form>
            </div>

            {/* My Requests */}

            <div
                className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-sm
          p-8
        "
            >
                <h2 className="text-2xl font-bold mb-6">
                    My Requests
                </h2>

                <div className="overflow-x-auto">

                    {requests?.length === 0 ? (

                        <div className="py-12 text-center">
                            <h3 className="text-lg font-semibold text-slate-700">
                                No Requests Found
                            </h3>

                            <p className="text-slate-500 mt-2">
                                Your submitted requests will appear here.
                            </p>
                        </div>

                    ) : (

                        <table className="w-full">

                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">

                                    <th className="text-left p-4">
                                        Asset Type
                                    </th>

                                    <th className="text-left p-4">
                                        Priority
                                    </th>

                                    <th className="text-left p-4">
                                        Status
                                    </th>

                                    <th className="text-left p-4">
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
                        border-b
                        border-slate-100
                        hover:bg-slate-50
                      "
                                        >
                                            <td className="p-4">
                                                {request.assetType}
                                            </td>

                                            <td className="p-4">

                                                <span
                                                    className={`
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-medium
                            ${request.priority === "High"
                                                            ? "bg-red-100 text-red-700"
                                                            : request.priority === "Medium"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-blue-100 text-blue-700"
                                                        }
                          `}
                                                >
                                                    {request.priority}
                                                </span>

                                            </td>

                                            <td className="p-4">

                                                <span
                                                    className={`
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-medium

                            ${request.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : request.status === "Approved"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-red-100 text-red-700"
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

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    )}

                    <div className="flex items-center justify-between p-4 border-t border-slate-200">

                        <p className="text-sm text-slate-500">
                            Showing {requests?.length ? firstIndex + 1 : 0} -
                            {Math.min(
                                lastIndex,
                                requests?.length || 0
                            )} of {requests?.length || 0}
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

        </div>
    );
};

export default RequestAsset;