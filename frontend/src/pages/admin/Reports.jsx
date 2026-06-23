import { useEffect } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    fetchDashboardStats,
    fetchAssetCategoryReport,
    fetchRequestReport,
} from "../../redux/slices/dashboardSlice";

import PageHeader from "../../components/layout/PageHeader";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LabelList,
} from "recharts";

import {
    FiCheckCircle,
    FiPackage,
    FiTrendingUp,
    FiClock,
} from "react-icons/fi";

import { saveAs } from "file-saver";

const Reports = () => {

    const dispatch =
        useDispatch();

    const {
        adminDashboard,
        categoryReport,
        requestReport,
        isLoading,
    } = useSelector(
        (state) => state.dashboard
    );

    useEffect(() => {
        dispatch(
            fetchDashboardStats()
        );

        dispatch(
            fetchAssetCategoryReport()
        );

        dispatch(
            fetchRequestReport()
        );

    }, [dispatch]);

    const assetStatusData = [
        {
            name: "Available",
            value: adminDashboard?.availableAssets || 0,
        },
        {
            name: "Assigned",
            value: adminDashboard?.assignedAssets || 0,
        },
        {
            name: "Maintenance",
            value: adminDashboard?.maintenanceAssets || 0,
        },
        {
            name: "Retired",
            value: adminDashboard?.retiredAssets || 0,
        },
    ];

    const COLORS = [
        "#10B981",
        "#8B5CF6",
        "#F59E0B",
        "#EF4444",
    ];

    const categoryData =
        categoryReport
            ?.map((item) => ({
                category: item._id,
                count: item.count,
            }))
            .sort(
                (a, b) =>
                    b.count - a.count
            ) || [];

    const requestData =
        requestReport?.map(
            (item) => ({
                status: item._id,
                count: item.count,
            })
        ) || [];

    const REQUEST_COLORS = {
        approved: "#10B981",
        pending: "#F59E0B",
        rejected: "#EF4444",
    };

    const totalAssets =
        adminDashboard?.totalAssets || 0;

    const availableAssets =
        adminDashboard?.availableAssets || 0;

    const availablePercentage =
        totalAssets > 0
            ? Math.round(
                (availableAssets / totalAssets) * 100
            )
            : 0;

    const topCategory =
        categoryData.length > 0
            ? categoryData[0]
            : null;

    const approvedRequests =
        requestData.find(
            (item) =>
                item.status?.toLowerCase() === "approved"
        )?.count || 0;

    const pendingRequests =
        requestData.find(
            (item) =>
                item.status?.toLowerCase() === "pending"
        )?.count || 0;

    const exportCSV = () => {

        const rows = [
            ["Metric", "Value"],

            [
                "Available Assets",
                adminDashboard?.availableAssets || 0,
            ],

            [
                "Assigned Assets",
                adminDashboard?.assignedAssets || 0,
            ],

            [
                "Maintenance Assets",
                adminDashboard?.maintenanceAssets || 0,
            ],

            [
                "Retired Assets",
                adminDashboard?.retiredAssets || 0,
            ],

            [
                "Employees",
                adminDashboard?.employees || 0,
            ],

            [
                "Pending Requests",
                adminDashboard?.pendingRequests || 0,
            ],
        ];

        const csvContent =
            rows
                .map((row) =>
                    row.join(",")
                )
                .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;",
            }
        );

        saveAs(
            blob,
            "asset-report.csv"
        );
    };

    if (isLoading) {
        return (
            <div className="text-center py-10">
                Loading reports...
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <PageHeader
                    title="Reports & Analytics"
                    description="Asset utilization and inventory insights"
                />

                <button
                    onClick={exportCSV}
                    className="
      bg-emerald-600
      hover:bg-emerald-700
      text-white
      px-4
      py-2
      rounded-xl
      font-medium
    "
                >
                    Export CSV
                </button>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                <h2 className="text-2xl font-bold">
                    Asset Insights
                </h2>

                <p className="mt-2 text-blue-100">
                    Monitor asset distribution, utilization and request trends.
                </p>
            </div>

            <div className="
  bg-white
  rounded-2xl
  border
  border-slate-200
  shadow-sm
  p-6
">
                <h2 className="text-xl font-bold mb-5">
                    Key Insights
                </h2>

                <div className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-4
  ">

                    <div className="
      flex items-center gap-3
      bg-green-50
      border border-green-200
      rounded-xl
      p-4
    ">
                        <div className="
        p-3
        rounded-xl
        bg-green-100
      ">
                            <FiPackage
                                className="
            text-green-600
            text-xl
          "
                            />
                        </div>

                        <p className="
        text-green-800
        font-medium
      ">
                            {availablePercentage}% assets are currently available
                        </p>
                    </div>

                    <div className="
      flex items-center gap-3
      bg-blue-50
      border border-blue-200
      rounded-xl
      p-4
    ">
                        <div className="
        p-3
        rounded-xl
        bg-blue-100
      ">
                            <FiTrendingUp
                                className="
            text-blue-600
            text-xl
          "
                            />
                        </div>

                        <p className="
        text-blue-800
        font-medium
      ">
                            {topCategory
                                ? `${topCategory.category} is the most common category (${topCategory.count} assets)`
                                : "No category data available"}
                        </p>
                    </div>

                    <div className="
      flex items-center gap-3
      bg-emerald-50
      border border-emerald-200
      rounded-xl
      p-4
    ">
                        <div className="
        p-3
        rounded-xl
        bg-emerald-100
      ">
                            <FiCheckCircle
                                className="
            text-emerald-600
            text-xl
          "
                            />
                        </div>

                        <p className="
        text-emerald-800
        font-medium
      ">
                            {approvedRequests} requests approved
                        </p>
                    </div>

                    <div className="
      flex items-center gap-3
      bg-amber-50
      border border-amber-200
      rounded-xl
      p-4
    ">
                        <div className="
        p-3
        rounded-xl
        bg-amber-100
      ">
                            <FiClock
                                className="
            text-amber-600
            text-xl
          "
                            />
                        </div>

                        <p className="
        text-amber-800
        font-medium
      ">
                            {pendingRequests} requests pending review
                        </p>
                    </div>

                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                <h2 className="text-xl font-bold mb-4">
                    Asset Status Overview
                </h2>

                <div className="h-80">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={assetStatusData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={70}
                                outerRadius={100}
                                label
                            >

                                {assetStatusData.map(
                                    (
                                        entry,
                                        index
                                    ) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index
                                                ]
                                            }
                                        />
                                    )
                                )}

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                <h2 className="text-xl font-bold mb-4">
                    Assets By Category
                </h2>

                <div className="h-[450px]">

                    {categoryData.length === 0 ? (
                        <div className="h-80 flex items-center justify-center text-slate-500">
                            No category data available
                        </div>
                    ) : (
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
                                layout="vertical"
                                data={categoryData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 30,
                                    bottom: 10,
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    opacity={0.3}
                                />

                                <XAxis
                                    type="number"
                                    allowDecimals={false}
                                />

                                <YAxis
                                    type="category"
                                    dataKey="category"
                                    width={100}
                                />

                                <Tooltip
                                    formatter={(value) => [
                                        value,
                                        "Assets",
                                    ]}
                                />

                                <Bar
                                    dataKey="count"
                                    fill="#2563EB"
                                    radius={[0, 8, 8, 0]}
                                >
                                    <LabelList
                                        dataKey="count"
                                        position="right"
                                    />
                                </Bar>

                            </BarChart>

                        </ResponsiveContainer>
                    )}

                </div>

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                <h2 className="text-xl font-bold mb-4">
                    Request Statistics
                </h2>

                <div className="h-80">
                    {requestData.length === 0 ? (
                        <div className="h-80 flex items-center justify-center text-slate-500">
                            No requests data available
                        </div>
                    ) : (
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
                                data={requestData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    opacity={0.3}
                                />

                                <XAxis
                                    dataKey="status"
                                />

                                <YAxis
                                    allowDecimals={false}
                                />

                                <Tooltip
                                    formatter={(value) => [
                                        value,
                                        "Requests",
                                    ]}
                                />

                                <Bar
                                    dataKey="count"
                                    radius={[8, 8, 0, 0]}
                                >
                                    {requestData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                REQUEST_COLORS[
                                                entry.status?.toLowerCase()
                                                ] || "#64748B"
                                            }
                                        />
                                    ))}

                                    <LabelList
                                        dataKey="count"
                                        position="top"
                                    />
                                </Bar>

                            </BarChart>

                        </ResponsiveContainer>

                    )}

                </div>

            </div>

        </div>
    );
};

export default Reports;