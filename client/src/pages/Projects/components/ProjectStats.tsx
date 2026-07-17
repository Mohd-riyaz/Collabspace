import { CheckCircle, Clock3, AlertCircle } from "lucide-react";

interface ProjectStatsProps {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
}

export default function ProjectStats({
    totalTasks,
    completedTasks,
    inProgressTasks,
    overdueTasks,
}: ProjectStatsProps) {
    const stats = [
        {
            title: "Total",
            value: totalTasks,
            icon: Clock3,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "Completed",
            value: completedTasks,
            icon: CheckCircle,
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            title: "In Progress",
            value: inProgressTasks,
            icon: Clock3,
            color: "text-yellow-600",
            bg: "bg-yellow-100",
        },
        {
            title: "Overdue",
            value: overdueTasks,
            icon: AlertCircle,
            color: "text-red-600",
            bg: "bg-red-100",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                        <div
                            className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}
                        >
                            <Icon className={stat.color} size={20} />
                        </div>

                        <p className="text-sm text-gray-500">
                            {stat.title}
                        </p>

                        <h3 className="mt-1 text-2xl font-bold">
                            {stat.value}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
}