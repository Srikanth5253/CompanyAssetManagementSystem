import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiHash,
  FiCheckCircle,
} from "react-icons/fi";

const EmployeeDetails = ({
  employee,
  onClose,
}) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Employee Details
            </h2>

            <p className="text-slate-300 text-sm mt-1">
              Employee information overview
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white"
          >
            <FiX size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center">

              <FiUser
                size={36}
                className="text-emerald-600"
              />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-slate-800">
                {employee.name}
              </h3>

              <p className="text-slate-500">
                {employee.designation}
              </p>

            </div>

          </div>

          {/* Details Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <InfoCard
              icon={<FiHash />}
              label="Employee ID"
              value={employee.employeeId}
            />

            <InfoCard
              icon={<FiMail />}
              label="Email"
              value={employee.email}
            />

            <InfoCard
              icon={<FiPhone />}
              label="Phone"
              value={
                employee.phone ||
                "Not Available"
              }
            />

            <InfoCard
              icon={<FiBriefcase />}
              label="Department"
              value={
                employee.department ||
                "Not Assigned"
              }
            />

            <InfoCard
              icon={<FiBriefcase />}
              label="Designation"
              value={
                employee.designation ||
                "Not Assigned"
              }
            />

            <InfoCard
              icon={<FiCheckCircle />}
              label="Status"
              value={
                employee.status
              }
            />

          </div>

          {/* Footer */}

          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">

            <button
              onClick={onClose}
              className="
                px-5
                py-3
                rounded-xl
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                font-medium
              "
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">

      <div className="flex items-center gap-3 mb-2">

        <div className="text-emerald-600">
          {icon}
        </div>

        <p className="text-sm text-slate-500">
          {label}
        </p>

      </div>

      <p className="font-semibold text-slate-800 break-words">
        {value}
      </p>

    </div>
  );
};

export default EmployeeDetails;