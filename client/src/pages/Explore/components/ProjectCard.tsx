import Card from "../../../components/ui/Card/Card";
import Button from "../../../components/ui/Button/Button";
import { FolderKanban, User, CircleDot } from "lucide-react";

interface ProjectCardProps {
    name: string;
    description: string;
    owner: string;
    techStack: string[];
    status: "Planning" | "In Progress" | "Completed";
}

export default function ProjectCard({
    name,
    description,
    owner,
    techStack,
    status,
}: ProjectCardProps) {
    return (
        <Card className="flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2">
                    <FolderKanban className="text-blue-600" size={22} />
                    <h2 className="text-xl font-semibold">{name}</h2>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                    {description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <User size={16} />
                    <span>{owner}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="mt-5 flex items-center gap-2">
                    <CircleDot
                        size={14}
                        className={
                            status === "Completed"
                                ? "text-green-600"
                                : status === "In Progress"
                                    ? "text-yellow-500"
                                    : "text-gray-500"
                        }
                    />

                    <span className="text-sm font-medium">
                        {status}
                    </span>
                </div>
            </div>

            <Button className="mt-6">
                View Project
            </Button>
        </Card>
    );
}