import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    FiSearch,
    FiPlus,
    FiUsers,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";

import {
    updateEmployee,
    fetchEmployees,
} from "../../redux/slices/employeeSlice";

import EmployeeStats
    from "../../components/employees/EmployeeStats";

import EditEmployeeModal
    from "../../components/employees/EditEmployee";

import DeleteEmployeeModal
    from "../../components/employees/DeleteEmployee";

import EmployeeDetailsModal
    from "../../components/employees/EmployeeDetails";

import PageHeader from "../../components/layout/PageHeader";

const Employees = () => {
    const dispatch = useDispatch();

    const [search, setSearch] =
        useState("");

    const navigate = useNavigate();

    const [
        selectedEmployee,
        setSelectedEmployee,
    ] = useState(null);

    const [
        showEditModal,
        setShowEditModal,
    ] = useState(false);

    const [
        showDeleteModal,
        setShowDeleteModal,
    ] = useState(false);

    const [
        showDetailsModal,
        setShowDetailsModal,
    ] = useState(false);

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [currentPage, setCurrentPage] =
        useState(1);

    const employeesPerPage = 5;

    const {
        employees,
        isLoading,
    } = useSelector(
        (state) => state.employees
    );

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const filteredEmployees = employees
        .filter((employee) => {
            const matchesSearch =
                employee.name?.toLowerCase().includes(search.toLowerCase()) ||
                employee.email?.toLowerCase().includes(search.toLowerCase()) ||
                employee.employeeId?.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "all"
                    ? true
                    : employee.status === statusFilter;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) =>
            a.employeeId.localeCompare(b.employeeId)
        );


    const lastIndex =
        currentPage *
        employeesPerPage;

    const firstIndex =
        lastIndex -
        employeesPerPage;

    const currentEmployees =
        filteredEmployees.slice(
            firstIndex,
            lastIndex
        );

    const totalPages =
        Math.ceil(
            filteredEmployees.length /
            employeesPerPage
        );

    return (
        <div className="space-y-8">

            <PageHeader
                title="Employees"
                description="Manage employee records and assignments"
            >
                <button
                    onClick={() => navigate("/dashboard/employees/add")}
                    className="
      inline-flex
      items-center
      gap-2
      bg-emerald-600
      hover:bg-emerald-700
      text-white
      px-5
      py-3
      rounded-xl
      font-medium
      shadow-sm
      transition-all
    "
                >
                    <FiPlus />
                    Add Employee
                </button>
            </PageHeader>

            <EmployeeStats
                employees={employees}
            />

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">

                <div className="flex flex-col lg:flex-row gap-4">

                    <div className="relative flex-1">

                        <FiSearch
                            className="
          absolute
          left-4
          top-3.5
          text-slate-400
        "
                        />

                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="
          w-full
          pl-12
          pr-4
          py-3
          rounded-xl
          border
          border-slate-300
          bg-slate-50
        "
                        />

                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                        className="
        px-4
        py-3
        rounded-xl
        border
        border-slate-300
        bg-white
      "
                    >
                        <option value="all">
                            All
                        </option>

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </select>

                    <button
                        onClick={() => {
                            setSearch("");
                            setStatusFilter(
                                "all"
                            );
                        }}
                        className="
        px-4
        py-3
        rounded-xl
        border
        border-slate-300
        hover:bg-slate-50
      "
                    >
                        View All
                    </button>

                </div>

            </div>

            {/* Table */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {isLoading ? (
                    <div className="p-12 text-center text-slate-500">
                        Loading employees...
                    </div>
                ) : filteredEmployees.length ===
                    0 ? (
                    <div className="p-12 text-center">

                        <FiUsers
                            size={50}
                            className="
                mx-auto
                text-slate-300
                mb-4
              "
                        />

                        <h3 className="text-lg font-semibold text-slate-700">
                            No Employees Found
                        </h3>

                        <p className="text-slate-500 mt-2">
                            Add your first employee
                            to get started.
                        </p>

                    </div>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-50 border-b border-slate-200">

                                <tr>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                                        Employee ID
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                                        Name
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                                        Email
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                                        Department
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                                        Designation
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                                        Status
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {currentEmployees.map(
                                    (
                                        employee
                                    ) => (
                                        <tr
                                            key={
                                                employee._id
                                            }
                                            className="
                        border-b
                        border-slate-100
                        hover:bg-slate-50
                      "
                                        >

                                            <td className="px-6 py-4 font-medium text-slate-700">
                                                {
                                                    employee.employeeId
                                                }
                                            </td>

                                            <td className="px-6 py-4 font-semibold">

                                                <button
                                                    onClick={() => {
                                                        setSelectedEmployee(employee);
                                                        setShowDetailsModal(true);
                                                    }}
                                                    className="                                             
      font-medium
      text-emerald-600
      hover:text-emerald-700
      hover:underline
    "
                                                >
                                                    {employee.name}
                                                </button>

                                            </td>

                                            <td className="px-6 py-4 text-slate-500 text-sm">
                                                {
                                                    employee.email
                                                }
                                            </td>

                                            <td className="px-6 py-4 font-medium">
                                                {
                                                    employee.department
                                                }
                                            </td>

                                            <td className="px-6 py-4 font-medium">
                                                {
                                                    employee.designation
                                                }
                                            </td>

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            ${employee.status ===
                                                            "active"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-red-100 text-red-700"
                                                        }
                          `}
                                                >
                                                    {
                                                        employee.status
                                                    }
                                                </span>

                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">

                                                    <button
                                                        onClick={() => {
                                                            setSelectedEmployee(employee);
                                                            setShowEditModal(true);
                                                        }}
                                                        className="
       h-10 w-10
 rounded-xl
 bg-emerald-50
 hover:bg-emerald-100
 "
                                                    >
                                                        <FiEdit2 size={18} />
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setSelectedEmployee(employee);
                                                            setShowDeleteModal(true);
                                                        }}
                                                        className="
        h-10 w-10
 rounded-xl
 bg-red-50
 hover:bg-red-100
      "
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                        <div className="flex items-center justify-between p-4 border-t border-slate-200">

                            <p className="text-sm text-slate-500">
                                Showing {firstIndex + 1} -
                                {Math.min(
                                    lastIndex,
                                    filteredEmployees.length
                                )} of{" "}
                                {filteredEmployees.length}
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
                                        currentPage ===
                                        totalPages
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
                )}

            </div>

            {showEditModal && (
                <EditEmployeeModal
                    selectedEmployee={selectedEmployee}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedEmployee(null);
                    }}
                />
            )}

            {
                showDeleteModal && (
                    <DeleteEmployeeModal
                        employee={
                            selectedEmployee
                        }
                        onClose={() => {
                            setShowDeleteModal(
                                false
                            );

                            setSelectedEmployee(
                                null
                            );
                        }}
                    />
                )
            }

            {
                showDetailsModal && (
                    <EmployeeDetailsModal
                        employee={selectedEmployee}
                        onClose={() => {
                            setShowDetailsModal(false);
                            setSelectedEmployee(null);
                        }}
                    />
                )
            }

        </div>
    );
};

export default Employees;