import {
    useEffect,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    fetchAllRequests,
    updateRequest,
} from "../../redux/slices/requestSlice";

import PageHeader from "../../components/layout/PageHeader";

import {
    toast,
} from "react-hot-toast";

const Requests = () => {
    const dispatch =
        useDispatch();

    const { requests } =
        useSelector(
            (state) =>
                state.requests
        );

    useEffect(() => {
        dispatch(
            fetchAllRequests()
        );
    }, [dispatch]);

    const handleStatus =
        async (
            id,
            status
        ) => {
            try {
                await dispatch(
                    updateRequest({
                        id,
                        status,
                    })
                ).unwrap();

                toast.success(
                    `Request ${status}`
                );
            } catch (error) {
                toast.error(error);
            }
        };


    return (
        <div className="space-y-8">

            <PageHeader
                title="Asset Requests"
                description="Review and approve employee asset requests"
            />

            <div className="
  bg-white
  rounded-2xl
  border
  border-slate-200
  shadow-sm
  overflow-hidden
">
                {requests?.length === 0 ? (

                    <div className="p-12 text-center">

                        <h3 className="text-lg font-semibold text-slate-700">
                            No Requests Found
                        </h3>

                        <p className="text-slate-500 mt-2">
                            Employee asset requests will appear here.
                        </p>

                    </div>

                ) : (
                    <table className="w-full">

                        <thead className="bg-slate-50">
                            <tr className="border-b border-slate-200">

                                <th className="p-4 text-left">
                                    Employee
                                </th>

                                <th className="p-4 text-left">
                                    Asset
                                </th>

                                <th className="p-4 text-left">
                                    Priority
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {requests?.map(
                                (request) => (
                                    <tr
                                        key={
                                            request._id
                                        }
                                        className="border-b"
                                    >

                                        <td className="p-4">
                                            <div>
                                                <p className="font-semibold">
                                                    {request.employee?.name}
                                                </p>

                                                <p className="text-sm text-black-500">
                                                    {request.employee?.employeeId}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            {
                                                request.assetType
                                            }
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`
      px-3 py-1 rounded-full text-sm font-medium
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
                                                className={`px-3 py-1 rounded-full text-sm font-medium
    ${request.status === "Approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : request.status === "Rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {request.status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            {request.status === "Pending" && (
                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            handleStatus(
                                                                request._id,
                                                                "Approved"
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

                                                    <button
                                                        onClick={() =>
                                                            handleStatus(
                                                                request._id,
                                                                "Rejected"
                                                            )
                                                        }
                                                        className="
px-4
py-2
rounded-lg
bg-red-600
hover:bg-red-700
text-white
font-medium
transition-all
"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
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

export default Requests;