import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";

import Login from "./pages/public/Login";

import Dashboard from "./pages/admin/Dashboard";
import Assets from "./pages/admin/Assets";
import AddAssetPage from "./pages/admin/AddAssetPage";
import Employees from "./pages/admin/Employees";
import AddEmployeePage from "./pages/admin/AddEmployeePage";
import MaintenanceRequests from "./pages/admin/MaintenanceRequests";
import Requests from "./pages/admin/Requests"
import AdminReturnRequest from "./pages/admin/ReturnRequests"
import AssetHistory from "./pages/admin/AssetHistory";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyAssets from "./pages/employee/MyAssets";
import RequestAsset from "./pages/employee/RequestAsset";
import EmployeeReturnRequests from "./pages/employee/ReturnRequests";
import Profile from "./pages/employee/Profile";
import Reports from "./pages/admin/Reports";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/employee"
        element={
          <ProtectedRoute
            allowedRoles={["employee"]}
          >
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<EmployeeDashboard />}
        />

        <Route
          path="my-assets"
          element={<MyAssets />}
        />

        <Route
          path="requests"
          element={<RequestAsset />}
        />

        <Route
          path="return-requests"
          element={<EmployeeReturnRequests />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />
      </Route>


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["admin"]}
          >
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="assets"
          element={<Assets />}
        />

        <Route
          path="assets/add"
          element={<AddAssetPage />}
        />

        <Route
          path="return-requests"
          element={<AdminReturnRequest />}
        />

        <Route
          path="history"
          element={
            <AssetHistory />
          }
        />

        <Route
          path="employees"
          element={<Employees />}
        />
        
        <Route
          path="employees/add"
          element={<AddEmployeePage/>}
        />

        <Route
          path="maintenance-requests"
          element={<MaintenanceRequests />}
        />
        
        <Route
          path="requests"
          element={<Requests />}
        />

        <Route
          path="reports"
          element={<Reports />}
        />

      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;