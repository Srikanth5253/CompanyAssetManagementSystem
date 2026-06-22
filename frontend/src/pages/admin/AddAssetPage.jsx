import AddAsset from "../../components/assets/AddAsset";
import PageHeader from "../../components/layout/PageHeader";

const AddAssetPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Asset"
        description="Create a new company asset"
      />

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold">
          Asset Registration
        </h2>

        <p className="mt-2 text-blue-100">
          Register and track company assets including
          laptops, monitors, printers, and accessories.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2">
        <AddAsset />
      </div>
    </div>
  );
};

export default AddAssetPage;