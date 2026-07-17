interface ProgressBarProps {
    progress: number;
}

export default function ProgressBar({
    progress,
}: ProgressBarProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">
                    Progress
                </span>

                <span className="font-semibold">
                    {progress}%
                </span>
            </div>

            <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>
        </div>
    );
}