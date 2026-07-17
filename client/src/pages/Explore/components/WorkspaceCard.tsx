import Card from "../../../components/ui/Card/Card";
import Button from "../../../components/ui/Button/Button";
import { Users, Lock, Globe } from "lucide-react";

interface WorkspaceCardProps {
    name: string;
    description: string;
    members: number;
    visibility: "Private" | "Public";
}

export default function WorkspaceCard({
    name,
    description,
    members,
    visibility,
}: WorkspaceCardProps) {
    return (
        <Card className="flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{name}</h2>

                    {visibility === "Public" ? (
                        <Globe className="text-green-600" size={18} />
                    ) : (
                        <Lock className="text-gray-500" size={18} />
                    )}
                </div>

                <p className="mt-3 text-sm text-gray-600">
                    {description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-gray-500">
                    <Users size={18} />
                    <span>{members} Members</span>
                </div>
            </div>

            <Button className="mt-6">
                Join Workspace
            </Button>
        </Card>
    );
}