import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FiGrid,
  FiBox,
  FiClipboard,
  FiBarChart2,
  FiClock,
  FiRotateCcw,
  FiPackage,
  FiUser,
  FiUsers,
  FiShield,
  FiLogOut,
  FiTool,
} from "react-icons/fi";

import { logout } from "../../redux/slices/authSlice";

const adminMenu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FiGrid />,
  },

  {
    name: "Assets",
    path: "/dashboard/assets",
    icon: <FiBox />,
  },

  {
    name: "Asset History",
    path: "/dashboard/history",
    icon: <FiClock />,
  },

  {
    name: "Employees",
    path: "/dashboard/employees",
    icon: <FiUsers />,
  },

  {
    name: "Maintenance",
    path: "/dashboard/maintenance-requests",
    icon: <FiTool />,
  },

  {
    name: "Requests",
    path: "/dashboard/requests",
    icon: <FiClipboard />,
  },

  {
    name: "Return Requests",
    path: "/dashboard/return-requests",
    icon: <FiRotateCcw />
  },

  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: <FiBarChart2 />,
  },
];

const employeeMenu = [
  {
    name: "Dashboard",
    path: "/employee",
    icon: <FiGrid />,
  },

  {
    name: "My Assets",
    path: "/employee/my-assets",
    icon: <FiBox />,
  },

  {
    name: "Request Asset",
    path: "/employee/requests",
    icon: <FiClipboard />,
  },

  {
    name: "Return Requests",
    path: "/employee/return-requests",
    icon: <FiRotateCcw />
  },

];

const Sidebar = () => {

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const { user } = useSelector(
    (state) => state.auth
  );

  const menuItems =
    user?.role === "admin"
      ? adminMenu
      : employeeMenu;

  return (
    <div>
    <aside className="
            fixed
            left-0
            top-0
            w-60
            h-screen
            bg-slate-900
            text-white
            border-r
            border-slate-800
            flex
            flex-col
  ">
      <div className="h-14 flex items-center gap-3 px-6 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
          <FiPackage className="text-white text-xl" />
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">
            AssetFlow
          </h1>
          <p className="text-xs text-slate-400">
            Asset Management
          </p>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={
                  item.path === "/dashboard" ||
                  item.path === "/employee"
                }
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${isActive
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <span className="text-lg">
                  {item.icon}
                </span>
                <span className="font-medium">
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-800 p-4">

        {user?.role === "employee" ? (
          <NavLink
            to="/employee/profile"
            className="
            flex
            items-center
            gap-3
            mb-4
            p-2
            rounded-xl
            hover:bg-slate-800
            transition-all
           "
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
              <FiUser className="text-white text-lg" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">
                {user?.name}
              </p>

              <p className="text-xs text-slate-400">
                View Profile
              </p>
            </div>
          </NavLink>
        ) : (
          <div className="flex items-center gap-3 mb-4 p-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
              <FiShield className="text-white text-lg" />
            </div>

            <div>
              <p className="font-medium text-white">
                {user?.name}
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowLogoutDialog(true)}
          className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          py-2.5
          rounded-xl
          bg-red-600
          hover:bg-red-700
          transition-all
         "
        >
          <FiLogOut />
          Logout
        </button>

      </div>
    
    </aside>

    {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[380px] rounded-2xl bg-white p-6 shadow-2xl">

          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <FiLogOut className="text-red-600 text-3xl" />
            </div>
          </div>

          <h2 className="mt-4 text-center text-xl font-bold text-slate-800">
            Logout
          </h2>

          <p className="mt-2 text-center text-slate-500">
            Are you sure you want to logout?
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setShowLogoutDialog(false)}
              className="flex-1 rounded-xl border border-slate-300 py-2.5 font-medium hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 rounded-xl bg-red-600 py-2.5 text-white font-medium hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Sidebar;