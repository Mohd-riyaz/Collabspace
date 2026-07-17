import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectHeaderProps {
    project: {
        name: string;
        description: string;
        priority: string;
        progress: number;
        dueDate: string;
    };
}

export default function ProjectHeader({
    project,
}: ProjectHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">

            <button
                onClick={() => navigate("/projects")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
                <ArrowLeft size={18} />
                Back to Projects
            </button>

            <div className="bg-white rounded-xl border p-6 shadow-sm">

                <h1 className="text-3xl font-bold">
                    {project.name}
                </h1>

                <p className="text-gray-500 mt-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-6">

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {project.priority} Priority
                    </span>

                    <span className="font-semibold">
                        {project.progress}% Complete
                    </span>

                    <span className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} />
                        {project.dueDate}
                    </span>

                </div>

            </div>

        </div>
    );
}