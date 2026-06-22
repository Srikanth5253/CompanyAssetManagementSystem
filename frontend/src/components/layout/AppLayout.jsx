import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 min-h-screen ml-60">

        <main className="p-4 md:p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AppLayout;