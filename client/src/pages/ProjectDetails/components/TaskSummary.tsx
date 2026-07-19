import Card from "../../../components/ui/Card/Card";
import mockUserStore from "../../../data/mockUser";

interface TaskSummaryProps {
    projectId: string;
}

export default function TaskSummary({
    projectId,
}: TaskSummaryProps) {
    const tasks = mockUserStore
        .getTasks()
        .filter((task) => task.projectId === projectId);

    const totalTasks = tasks.length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const inReview = tasks.filter((t) => t.status === "in_review").length;
    const done = tasks.filter((t) => t.status === "done").length;

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">
                Task Summary
            </h2>

            {totalTasks === 0 ? (
                <p className="text-gray-500">
                    No tasks found for this project.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="rounded-lg border p-4 text-center">
                            <p className="text-sm text-gray-500">Total</p>
                            <h3 className="text-3xl font-bold">{totalTasks}</h3>
                        </div>

                        <div className="rounded-lg border p-4 text-center">
                            <p className="text-sm text-gray-500">Todo</p>
                            <h3 className="text-3xl font-bold text-gray-600">
                                {todo}
                            </h3>
                        </div>

                        <div className="rounded-lg border p-4 text-center">
                            <p className="text-sm text-gray-500">In Progress</p>
                            <h3 className="text-3xl font-bold text-blue-600">
                                {inProgress}
                            </h3>
                        </div>

                        <div className="rounded-lg border p-4 text-center">
                            <p className="text-sm text-gray-500">In Review</p>
                            <h3 className="text-3xl font-bold text-yellow-600">
                                {inReview}
                            </h3>
                        </div>

                        <div className="rounded-lg border p-4 text-center">
                            <p className="text-sm text-gray-500">Done</p>
                            <h3 className="text-3xl font-bold text-green-600">
                                {done}
                            </h3>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex justify-between mb-2 text-sm">
                            <span>Completion Progress</span>
                            <span>
                                {Math.round((done / totalTasks) * 100)}%
                            </span>
                        </div>

                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full"
                                style={{
                                    width: `${(done / totalTasks) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                </>
            )}
        </Card>
    );
}