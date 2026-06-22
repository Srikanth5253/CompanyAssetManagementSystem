import {
  FiPackage,
  FiCheckCircle,
  FiTool,
  FiArchive,
  FiLayers,
} from "react-icons/fi";

const AssetStats = ({ assets }) => {
  const totalAssets =
    assets.length;

  const availableAssets =
    assets.filter(
      (asset) =>
        asset.status ===
        "available"
    ).length;

  const assignedAssets =
    assets.filter(
      (asset) =>
        asset.status ===
        "assigned"
    ).length;

  const maintenanceAssets =
    assets.filter(
      (asset) =>
        asset.status ===
        "maintenance"
    ).length;

  const retiredAssets =
    assets.filter(
      (asset) =>
        asset.status ===
        "retired"
    ).length;

  const stats = [
    {
      title:
        "Total Assets",
      value:
        totalAssets,
      icon: FiLayers,
      color:
        "bg-slate-100 text-slate-700",
    },

    {
      title:
        "Available",
      value:
        availableAssets,
      icon:
        FiCheckCircle,
      color:
        "bg-emerald-100 text-emerald-600",
    },

    {
      title:
        "Assigned",
      value:
        assignedAssets,
      icon:
        FiPackage,
      color:
        "bg-blue-100 text-blue-600",
    },

    {
      title:
        "Maintenance",
      value:
        maintenanceAssets,
      icon: FiTool,
      color:
        "bg-amber-100 text-amber-600",
    },

    {
      title:
        "Retired",
      value:
        retiredAssets,
      icon:
        FiArchive,
      color:
        "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

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

export default AssetStats;