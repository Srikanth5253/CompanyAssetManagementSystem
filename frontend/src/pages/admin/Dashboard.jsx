// import { useEffect } from "react";

// import { useNavigate } from "react-router-dom";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   fetchDashboardStats,
// } from "../../redux/slices/dashboardSlice";

// import PageHeader from "../../components/layout/PageHeader";

// import {
//   FiPackage,
//   FiCheckCircle,
//   FiBox,
//   FiUsers,
//   FiFileText,
//   FiRotateCcw,
//   FiPlus,
//   FiUserPlus,
// } from "react-icons/fi";

// const Dashboard = () => {

//   const dispatch =
//     useDispatch();

//   const navigate =
//     useNavigate();

//   const {
//     adminDashboard,
//     isLoading,
//   } = useSelector(
//     (state) =>
//       state.dashboard
//   );

//   useEffect(() => {
//     dispatch(
//       fetchDashboardStats()
//     );
//   }, [dispatch]);

//   const cards = [
//     {
//       title: "Total Assets",
//       value:
//         adminDashboard
//           ?.totalAssets || 0,
//       icon: FiPackage,
//       bg: "bg-blue-100",
//       text: "text-blue-600",
//     },

//     {
//       title:
//         "Available Assets",

//       value:
//         adminDashboard
//           ?.availableAssets || 0,

//       icon:
//         FiCheckCircle,

//       bg:
//         "bg-green-100",

//       text:
//         "text-green-600",
//     },

//     {
//       title:
//         "Assigned Assets",

//       value:
//         adminDashboard
//           ?.assignedAssets || 0,

//       icon: FiBox,

//       bg:
//         "bg-purple-100",

//       text:
//         "text-purple-600",
//     },

//     {
//       title:
//         "Employees",

//       value:
//         adminDashboard
//           ?.employees || 0,

//       icon:
//         FiUsers,

//       bg:
//         "bg-orange-100",

//       text:
//         "text-orange-600",
//     },

//     {
//       title:
//         "Pending Requests",

//       value:
//         adminDashboard
//           ?.pendingRequests || 0,

//       icon:
//         FiFileText,

//       bg:
//         "bg-yellow-100",

//       text:
//         "text-yellow-600",
//     },

//     {
//       title:
//         "Pending Returns",

//       value:
//         adminDashboard
//           ?.pendingReturnRequests || 0,

//       icon:
//         FiRotateCcw,

//       bg:
//         "bg-red-100",

//       text:
//         "text-red-600",
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="text-center py-10">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <PageHeader
//         title="Dashboard"
//         description="Overview of assets, employees, requests and returns"
//       />
//       <div className="
//   grid
//   grid-cols-1
//   md:grid-cols-2
//   xl:grid-cols-3
//   gap-6
// ">

//         {cards.map(
//           (card) => {

//             const Icon =
//               card.icon;

//             return (

//               <div
//                 key={card.title}
//                 className="
//             bg-white
//             rounded-2xl
//             p-6
//             shadow-sm
//             border
//             hover:shadow-lg hover:-translate-y-1 transition-all duration-300
//           "
//               >

//                 <div className="
//             flex
//             justify-between
//             items-center
//           ">

//                   <div>

//                     <p className="
//                 text-sm
//                 text-gray-500
//               ">
//                       {card.title}
//                     </p>

//                     <h2 className="
//                 text-4xl font-bold tracking-tight mt-2
//               ">
//                       {card.value}
//                     </h2>

//                   </div>

//                   <div
//                     className={`
//                 ${card.bg}
//                 p-4
//                 rounded-2xl
//               `}
//                   >

//                     <Icon
//                       className={`
//                   ${card.text}
//                   text-3xl
//                 `}
//                     />

//                   </div>

//                 </div>

//               </div>
//             );
//           }
//         )}

//       </div>

//       <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

//         <h2 className="text-xl font-semibold text-slate-800 mb-4">
//           Quick Actions
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

//           <button
//             onClick={() =>
//               navigate("/dashboard/assets")
//             }
//             className="
//         bg-blue-600
//         hover:bg-blue-700
//         text-white
//         p-5
//         rounded-2xl
//         flex
//         items-center
//         gap-3
//         font-semibold
//       "
//           >
//             <FiPlus size={22} />
//             Add Asset
//           </button>

//           <button
//             onClick={() =>
//               navigate("/dashboard/employees")
//             }
//             className="
//         bg-green-600
//         hover:bg-green-700
//         text-white
//         p-5
//         rounded-2xl
//         flex
//         items-center
//         gap-3
//         font-semibold
//       "
//           >
//             <FiUserPlus size={22} />
//             Add Employee
//           </button>

//           <button
//             onClick={() =>
//               navigate("/dashboard/requests")
//             }
//             className="
//         bg-yellow-500
//         hover:bg-yellow-600
//         text-white
//         p-5
//         rounded-2xl
//         flex
//         items-center
//         gap-3
//         font-semibold
//       "
//           >
//             <FiFileText size={22} />
//             View Requests
//           </button>

//           <button
//             onClick={() =>
//               navigate(
//                 "/dashboard/return-requests"
//               )
//             }
//             className="
//         bg-orange-500
//         hover:bg-orange-600
//         text-white
//         p-5
//         rounded-2xl
//         flex
//         items-center
//         gap-3
//         font-semibold
//       "
//           >
//             <FiRotateCcw size={22} />
//             View Returns
//           </button>

//         </div>

//       </div>

//     </div>

//   );

// };

// export default Dashboard;


import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchDashboardStats,
} from "../../redux/slices/dashboardSlice";

import PageHeader from "../../components/layout/PageHeader";

import {
  FiPackage,
  FiCheckCircle,
  FiBox,
  FiUsers,
  FiFileText,
  FiRotateCcw,
  FiPlus,
  FiUserPlus,
  FiTool,
  FiArchive,
} from "react-icons/fi";

const Dashboard = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    adminDashboard,
    isLoading,
  } = useSelector(
    (state) =>
      state.dashboard
  );

  useEffect(() => {
    dispatch(
      fetchDashboardStats()
    );
  }, [dispatch]);

  const cards = [
    {
      title: "Total Assets",
      value:
        adminDashboard
          ?.totalAssets || 0,
      icon: FiPackage,
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "bg-blue-500"
    },

    {
      title:
        "Available Assets",

      value:
        adminDashboard
          ?.availableAssets || 0,

      icon:
        FiCheckCircle,

      bg: "bg-green-100",

      text: "text-green-600",

      border: "bg-green-500",

    },

    {
      title:
        "Assigned Assets",

      value:
        adminDashboard
          ?.assignedAssets || 0,

      icon: FiBox,

      bg: "bg-purple-100",

      text: "text-purple-600",

      border: "bg-purple-500",

    },

    {
      title: "Maintenance Assets",

      value:
        adminDashboard
          ?.maintenanceAssets || 0,

      icon: FiTool,

      bg: "bg-amber-100",

      text: "text-amber-600",

      border: "bg-amber-500",
    },

    {
      title: "Retired Assets",

      value:
        adminDashboard?.retiredAssets || 0,

      icon: FiArchive ,

      bg: "bg-red-100",

      text: "text-red-600",

      border: "bg-red-500",
    },

    {
      title:
        "Employees",

      value:
        adminDashboard
          ?.employees || 0,

      icon:
        FiUsers,

      bg: "bg-orange-100",

      text: "text-orange-600",

      border: "bg-orange-500",

    },

    {
      title:
        "Pending Requests",

      value:
        adminDashboard
          ?.pendingRequests || 0,

      icon:
        FiFileText,

      bg: "bg-yellow-100",

      text: "text-yellow-600",

      border: "bg-yellow-500",

    },

    {
      title:
        "Pending Returns",

      value:
        adminDashboard
          ?.pendingReturnRequests || 0,

      icon:
        FiRotateCcw,

      bg: "bg-red-100",

      text: "text-red-600",

      border: "bg-red-500",

    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-24 rounded-3xl bg-slate-200 animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-3xl bg-slate-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of assets, employees, requests and returns"
      />

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold">
          Asset Management Overview
        </h2>

        <p className="mt-2 text-blue-100 max-w-2xl">
          Monitor company assets, employee allocations,
          requests, approvals, and returns from one
          centralized dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Asset Utilization
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {adminDashboard?.totalAssets
              ? Math.round(
                (adminDashboard.assignedAssets /
                  adminDashboard.totalAssets) *
                100
              )
              : 0}
            %
          </h3>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending Actions
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {(adminDashboard?.pendingRequests || 0) +
              (adminDashboard?.pendingReturnRequests || 0)}
          </h3>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Workforce
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {adminDashboard?.employees || 0}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
              relative
              overflow-hidden
              bg-white/80
              backdrop-blur-sm
              rounded-3xl
              p-6
              border
              border-slate-200
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
            "
            >
              <div
                className={`absolute left-0 top-0 h-full w-1 ${card.border}`}
              />

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 mt-2">
                    Live Data
                  </span>

                  <h2 className="mt-4 text-5xl font-bold tracking-tight text-slate-900">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`${card.bg} p-4 rounded-2xl`}
                >
                  <Icon
                    className={`${card.text} text-3xl`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <button
            onClick={() =>
              navigate("/dashboard/assets/add")
            }
            className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-2xl p-5 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <FiPlus className="text-blue-600 text-xl" />
              </div>

              <div className="text-left">
                <p className="font-semibold text-slate-800">
                  Add Asset
                </p>

                <p className="text-sm text-slate-500">
                  Create a new company asset
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() =>
              navigate("/dashboard/employees/add")
            }
            className="group bg-slate-50 hover:bg-green-50 border border-slate-200 rounded-2xl p-5 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <FiUserPlus className="text-green-600 text-xl" />
              </div>

              <div className="text-left">
                <p className="font-semibold text-slate-800">
                  Add Employee
                </p>

                <p className="text-sm text-slate-500">
                  Register a new employee
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() =>
              navigate("/dashboard/requests")
            }
            className="group bg-slate-50 hover:bg-yellow-50 border border-slate-200 rounded-2xl p-5 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <FiFileText className="text-yellow-600 text-xl" />
              </div>

              <div className="text-left">
                <p className="font-semibold text-slate-800">
                  Requests
                </p>

                <p className="text-sm text-slate-500">
                  Review pending requests
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() =>
              navigate("/dashboard/return-requests")
            }
            className="group bg-slate-50 hover:bg-orange-50 border border-slate-200 rounded-2xl p-5 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-100">
                <FiRotateCcw className="text-orange-600 text-xl" />
              </div>

              <div className="text-left">
                <p className="font-semibold text-slate-800">
                  Returns
                </p>

                <p className="text-sm text-slate-500">
                  Process asset returns
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

};

export default Dashboard;