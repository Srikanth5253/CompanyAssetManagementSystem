import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiBriefcase,
} from "react-icons/fi";

const EmployeeStats = ({
  employees,
}) => {
  const totalEmployees =
    employees.length;

  const activeEmployees =
    employees.filter(
      (employee) =>
        employee.status ===
        "active"
    ).length;

  const inactiveEmployees =
    employees.filter(
      (employee) =>
        employee.status ===
        "inactive"
    ).length;

  const departments =
    new Set(
      employees.map(
        (employee) =>
          employee.department
      )
    ).size;

  const stats = [
    {
      title:
        "Total Employees",
      value:
        totalEmployees,
      icon: FiUsers,
      color:
        "bg-emerald-100 text-emerald-600",
    },

    {
      title: "Active",
      value:
        activeEmployees,
      icon: FiUserCheck,
      color:
        "bg-green-100 text-green-600",
    },

    {
      title: "Inactive",
      value:
        inactiveEmployees,
      icon: FiUserX,
      color:
        "bg-red-100 text-red-600",
    },

    {
      title:
        "Departments",
      value: departments,
      icon: FiBriefcase,
      color:
        "bg-slate-100 text-slate-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((stat) => {
        const Icon =
          stat.icon;

        return (
          <div
            key={stat.title}
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-6
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h3 className="text-3xl font-bold text-slate-800 mt-2">
                  {stat.value}
                </h3>

              </div>

              <div
                className={`
                  p-3
                  rounded-xl
                  ${stat.color}
                `}
              >
                <Icon size={24} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeStats;