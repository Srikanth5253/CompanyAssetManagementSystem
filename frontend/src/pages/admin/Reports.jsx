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
            value:
                adminDashboard
                    ?.availableAssets || 0,
        },
        {
            name: "Assigned",
            value:
                adminDashboard
                    ?.assignedAssets || 0,
        },
    ];

    const COLORS = [
        "#10B981",
        "#8B5CF6",
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

    if (isLoading) {
        return (
            <div className="text-center py-10">
                Loading reports...
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <PageHeader
                title="Reports & Analytics"
                description="Asset utilization and inventory insights"
            />
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                <h2 className="text-2xl font-bold">
                    Asset Insights
                </h2>

                <p className="mt-2 text-blue-100">
                    Monitor asset distribution, utilization and request trends.
                </p>
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
                                    fill="#F59E0B"
                                    radius={[8, 8, 0, 0]}
                                >
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