// import { useEffect } from "react";
// import {
//   FiBox,
//   FiCheckCircle,
//   FiClock,
//   FiClipboard,
//   FiPackage,
//   FiRotateCcw,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import PageHeader from "../../components/layout/PageHeader";
// import { fetchEmployeeDashboard } from "../../redux/slices/dashboardSlice";

// const EmployeeDashboard = () => {
//   const dispatch = useDispatch();

//   const { employeeDashboard, isLoading } = useSelector(
//     (state) => state.dashboard
//   );

//   useEffect(() => {
//     dispatch(fetchEmployeeDashboard());
//   }, [dispatch]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="text-lg font-medium text-slate-600">
//           Loading Dashboard...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <PageHeader
//         title="Employee Dashboard"
//         description="Manage your assigned assets and requests"
//       />

//       {/* Hero Banner */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">
//         <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-3xl" />

//         <div className="relative z-10">
//           <h2 className="text-3xl md:text-4xl font-bold">
//             Welcome Back 👋
//           </h2>

//           <p className="mt-3 text-blue-100 text-lg">
//             Track your assigned assets, requests and return activities.
//           </p>

//           <div className="mt-6">
//             <p className="text-blue-100">
//               Manage all your company assets from one place.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Total Assets */}
//         <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
//           <div className="absolute top-0 right-0 h-24 w-24 bg-blue-100 rounded-full blur-3xl opacity-70" />

//           <div className="flex justify-between items-center relative z-10">
//             <div>
//               <p className="text-slate-500">
//                 Total Assets
//               </p>

//               <h2 className="text-4xl font-bold text-blue-600 mt-2">
//                 {employeeDashboard?.totalAssets || 0}
//               </h2>
//             </div>

//             <div className="bg-blue-100 p-4 rounded-2xl">
//               <FiBox
//                 size={28}
//                 className="text-blue-600"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Active Assets */}
//         <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
//           <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-100 rounded-full blur-3xl opacity-70" />

//           <div className="flex justify-between items-center relative z-10">
//             <div>
//               <p className="text-slate-500">
//                 Active Assets
//               </p>

//               <h2 className="text-4xl font-bold text-emerald-600 mt-2">
//                 {employeeDashboard?.activeAssets || 0}
//               </h2>
//             </div>

//             <div className="bg-emerald-100 p-4 rounded-2xl">
//               <FiCheckCircle
//                 size={28}
//                 className="text-emerald-600"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Latest Asset */}
//         <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
//           <div className="absolute top-0 right-0 h-24 w-24 bg-amber-100 rounded-full blur-3xl opacity-70" />

//           <div className="flex justify-between items-center relative z-10">
//             <div>
//               <p className="text-slate-500">
//                 Latest Asset
//               </p>

//               <h2 className="text-xl font-bold text-amber-600 mt-2">
//                 {employeeDashboard?.latestAsset?.assetName || "-"}
//               </h2>
//             </div>

//             <div className="bg-amber-100 p-4 rounded-2xl">
//               <FiClock
//                 size={28}
//                 className="text-amber-600"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div>
//         <h3 className="text-xl font-semibold text-slate-800 mb-4">
//           Quick Actions
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           <Link
//             to="/employee/my-assets"
//             className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
//           >
//             <FiPackage
//               size={24}
//               className="text-blue-600 mb-3"
//             />

//             <h4 className="font-semibold text-slate-800">
//               My Assets
//             </h4>

//             <p className="text-sm text-slate-500 mt-1">
//               View all assigned assets
//             </p>
//           </Link>

//           <Link
//             to="/employee/requests"
//             className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
//           >
//             <FiClipboard
//               size={24}
//               className="text-emerald-600 mb-3"
//             />

//             <h4 className="font-semibold text-slate-800">
//               Request Asset
//             </h4>

//             <p className="text-sm text-slate-500 mt-1">
//               Submit a new asset request
//             </p>
//           </Link>

//           <Link
//             to="/employee/return-requests"
//             className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
//           >
//             <FiRotateCcw
//               size={24}
//               className="text-orange-600 mb-3"
//             />

//             <h4 className="font-semibold text-slate-800">
//               Return Requests
//             </h4>

//             <p className="text-sm text-slate-500 mt-1">
//               Track and manage asset returns
//             </p>
//           </Link>
//         </div>
//       </div>

//       <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-6 text-white shadow-lg">
//         <h3 className="text-xl font-semibold">
//           Asset Insights
//         </h3>

//         <p className="mt-4 text-green-100">
//           You currently have
//           <span className="font-bold text-white">
//             {" "}
//             {employeeDashboard?.activeAssets || 0} active assets
//           </span>
//           {" "}
//           assigned by your organization.
//         </p>

//         <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-white rounded-full"
//             style={{
//               width: `${
//                 employeeDashboard?.totalAssets
//                   ? (employeeDashboard.activeAssets /
//                       employeeDashboard.totalAssets) *
//                     100
//                   : 0
//               }%`,
//             }}
//           />
//         </div>

//         <p className="mt-3 text-sm text-green-100">
//           Keep your assigned assets updated and submit return requests when needed.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;

import { useEffect } from "react";

import {
  FiCheckCircle,
  FiClipboard,
  FiPackage,
  FiRotateCcw,
  FiTool,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import PageHeader from "../../components/layout/PageHeader";

import {
  fetchEmployeeDashboard,
} from "../../redux/slices/dashboardSlice";

const EmployeeDashboard = () => {

  const dispatch =
    useDispatch();

  const {
    employeeDashboard,
    isLoading,
  } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {

    dispatch(
      fetchEmployeeDashboard()
    );

  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg font-medium text-slate-600">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <PageHeader
        title="Employee Dashboard"
        description="Manage your assigned assets and requests"
      />

      {/* Hero Banner */}

      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

        <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10">

          <h2 className="text-3xl md:text-4xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="mt-3 text-blue-100 text-lg">
            Track your assigned assets,
            requests and maintenance activities.
          </p>

          <div className="mt-6">
            <p className="text-blue-100">
              Manage all your company assets from one place.
            </p>
          </div>

        </div>

      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Active Assets */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Active Assets
              </p>

              <h2 className="text-4xl font-bold text-emerald-600 mt-2">
                {employeeDashboard?.activeAssets || 0}
              </h2>

            </div>

            <div className="bg-emerald-100 p-4 rounded-2xl">

              <FiCheckCircle
                size={28}
                className="text-emerald-600"
              />

            </div>

          </div>

        </div>

        {/* Pending Requests */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Pending Requests
              </p>

              <h2 className="text-4xl font-bold text-blue-600 mt-2">
                {employeeDashboard?.pendingRequests || 0}
              </h2>

            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">

              <FiClipboard
                size={28}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>

        {/* Pending Returns */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Pending Returns
              </p>

              <h2 className="text-4xl font-bold text-orange-600 mt-2">
                {employeeDashboard?.pendingReturns || 0}
              </h2>

            </div>

            <div className="bg-orange-100 p-4 rounded-2xl">

              <FiRotateCcw
                size={28}
                className="text-orange-600"
              />

            </div>

          </div>

        </div>

        {/* Maintenance Requests */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Maintenance Requests
              </p>

              <h2 className="text-4xl font-bold text-amber-600 mt-2">
                {employeeDashboard?.maintenanceRequests || 0}
              </h2>

            </div>

            <div className="bg-amber-100 p-4 rounded-2xl">

              <FiTool
                size={28}
                className="text-amber-600"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div>

        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <Link
            to="/employee/my-assets"
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >

            <FiPackage
              size={24}
              className="text-blue-600 mb-3"
            />

            <h4 className="font-semibold text-slate-800">
              My Assets
            </h4>

            <p className="text-sm text-slate-500 mt-1">
              View all assigned assets
            </p>

          </Link>

          <Link
            to="/employee/requests"
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >

            <FiClipboard
              size={24}
              className="text-emerald-600 mb-3"
            />

            <h4 className="font-semibold text-slate-800">
              Request Asset
            </h4>

            <p className="text-sm text-slate-500 mt-1">
              Submit a new asset request
            </p>

          </Link>

          <Link
            to="/employee/return-requests"
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >

            <FiRotateCcw
              size={24}
              className="text-orange-600 mb-3"
            />

            <h4 className="font-semibold text-slate-800">
              Return Requests
            </h4>

            <p className="text-sm text-slate-500 mt-1">
              Track and manage returns
            </p>

          </Link>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Recent Activity
        </h3>

        <div className="space-y-3">

          {employeeDashboard?.recentActivity?.length > 0 ? (

            employeeDashboard.recentActivity.map(
              (activity) => (

                <div
                  key={activity._id}
                  className="
                    flex
                    justify-between
                    items-center
                    border-b
                    border-slate-100
                    pb-3
                  "
                >

                  <div>

                    <p className="font-medium">
                      {activity.asset?.assetName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {activity.action}
                    </p>

                  </div>

                  <span className="text-xs text-slate-400">

                    {new Date(
                      activity.createdAt
                    ).toLocaleDateString()}

                  </span>

                </div>

              )
            )

          ) : (

            <p className="text-slate-500">
              No recent activity found.
            </p>

          )}

        </div>

      </div>

      {/* Insights */}

      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-6 text-white shadow-lg">

        <h3 className="text-xl font-semibold">
          Asset Insights
        </h3>

        <p className="mt-4 text-green-100">

          You currently have

          <span className="font-bold text-white">
            {" "}
            {employeeDashboard?.activeAssets || 0}
            {" "}
            active assets
          </span>

          assigned by your organization.

        </p>

        <p className="mt-3 text-sm text-green-100">
          Keep your assigned assets updated and report maintenance issues when needed.
        </p>

      </div>

    </div>
  );
};

export default EmployeeDashboard;