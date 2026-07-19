import Card from "../../../components/ui/Card/Card";
import mockUserStore from "../../../data/mockUser";

interface RecentActivityProps {
    projectName: string;
}

export default function RecentActivity({
    projectName,
}: RecentActivityProps) {
    const activities = mockUserStore
        .getActivities()
        .filter(
            (activity) =>
                activity.target &&
                activity.target
                    .toLowerCase()
                    .includes(projectName.toLowerCase())
        );

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">
                Recent Activity
            </h2>

            {activities.length === 0 ? (
                <p className="text-gray-500">
                    No recent activity found.
                </p>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center gap-4 border rounded-lg p-4"
                        >
                            <img
                                src={activity.userAvatar}
                                alt={activity.userName}
                                className="w-10 h-10 rounded-full"
                            />

                            <div>
                                <p>
                                    <span className="font-semibold">
                                        {activity.userName}
                                    </span>{" "}
                                    {activity.action}{" "}
                                    <span className="font-medium">
                                        {activity.target}
                                    </span>
                                </p>

                                <p className="text-sm text-gray-500">
                                    {activity.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}