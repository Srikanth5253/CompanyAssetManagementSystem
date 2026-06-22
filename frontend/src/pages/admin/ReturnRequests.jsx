import { useEffect } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    fetchAllReturnRequests,
    approveReturnRequest,
} from "../../redux/slices/returnRequestSlice";

import PageHeader from "../../components/layout/PageHeader";

import {
    toast,
} from "react-hot-toast";

const ReturnRequests = () => {
    const dispatch =
        useDispatch();

    const {
        returnRequests,
    } = useSelector(
        (state) =>
            state.returnRequests
    );

    useEffect(() => {
        dispatch(
            fetchAllReturnRequests()
        );
    }, [dispatch]);

    const handleApprove =
        async (id) => {
            try {

                await dispatch(
                    approveReturnRequest(
                        id
                    )
                ).unwrap();

                toast.success(
                    "Return Approved"
                );

                dispatch(
                    fetchAllReturnRequests()
                );

            } catch (error) {
                toast.error(error);
            }
        };

    return (
        <div className="space-y-8">

            <PageHeader
                title="Return Requests"
                description="Review and process employee asset returns"
            />

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
                            Employee return requests will appear here.
                        </p>

                    </div>

                ) : (

                    <table className="w-full">

                        <thead className="bg-slate-50">

                            <tr className="
  border-b
  border-slate-100
  hover:bg-slate-50
">

                                <th className="p-4 text-left">
                                    Employee
                                </th>

                                <th className="p-4 text-left">
                                    Asset
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                <th className="p-4 text-left">
                                    Requested Date
                                </th>

                                <th className="p-4 text-left">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {returnRequests?.map(
                                (request) => (
                                    <tr
                                        key={
                                            request._id
                                        }
                                        className="border-b"
                                    >

                                        <td className="p-4">
                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    {request.employee?.name}
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    {request.employee?.employeeId}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div>
                                                <p className="font-semibold">
                                                    {request.asset?.assetName}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {request.asset?.assetTag}
                                                </p>
                                            </div>
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

                                        <td className="p-4">

                                            {request.status ===
                                                "Pending" ? (

                                                <button
                                                    onClick={() =>
                                                        handleApprove(
                                                            request._id
                                                        )
                                                    }
                                                    className="
  px-4
  py-2
  rounded-lg
  bg-emerald-600
  hover:bg-emerald-700
  text-white
  font-medium
  transition-all
"
                                                >
                                                    Approve
                                                </button>

                                            ) : (

                                                <span
                                                    className="
    px-3
    py-1
    rounded-full
    bg-slate-100
    text-slate-600
    text-sm
    font-medium
  "
                                                >
                                                    Completed
                                                </span>
                                            )}

                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>
                )}

            </div>

        </div>
    );
};

export default ReturnRequests;