import AddEmployee from "../../components/employees/AddEmployee";
import PageHeader from "../../components/layout/PageHeader";

const AddEmployeePage = () => {
  return (
    
    <div className="space-y-6">
      <PageHeader
        title="Add Employee"
        description="Register a new employee"
      />

      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold">
          Employee Registration
        </h2>

        <p className="mt-2 text-emerald-100">
          Create employee accounts, assign departments,
          and manage workforce records from one place.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2">
        <AddEmployee />
      </div>
    </div>
  );
};

export default AddEmployeePage;