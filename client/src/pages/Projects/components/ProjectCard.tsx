import { useNavigate } from "react-router-dom";
import { CalendarDays, Users } from "lucide-react";

import Card from "../../../components/ui/Card/Card";
import Button from "../../../components/ui/Button/Button";
import ProgressBar from "./ProgressBar";

interface ProjectCardProps {
    id: number;
    name: string;
    description: string;
    progress: number;
    members: number;
    dueDate: string;
    priority: "Low" | "Medium" | "High";
}

export default function ProjectCard({
    id,
    name,
    description,
    progress,
    members,
    dueDate,
    priority,
}: ProjectCardProps) {
    const navigate = useNavigate();

    return (
        <Card className="flex flex-col gap-5">
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{name}</h2>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${priority === "High"
                                ? "bg-red-100 text-red-600"
                                : priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                    >
                        {priority}
                    </span>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                    {description}
                </p>
            </div>

            <ProgressBar progress={progress} />

            <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>{members} Members</span>
                </div>

                <div className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    <span>{dueDate}</span>
                </div>
            </div>

            <Button onClick={() => navigate(`/projects/${id}`)}>
                Open Project
            </Button>
        </Card>
    );
}