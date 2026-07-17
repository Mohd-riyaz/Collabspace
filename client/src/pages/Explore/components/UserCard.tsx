import Card from "../../../components/ui/Card/Card";
import Button from "../../../components/ui/Button/Button";
import { User, MapPin, Briefcase } from "lucide-react";

interface UserCardProps {
    name: string;
    role: string;
    location: string;
    skills: string[];
}

export default function UserCard({
    name,
    role,
    location,
    skills,
}: UserCardProps) {
    return (
        <Card className="flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                        <User className="text-blue-600" size={28} />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">{name}</h2>

                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                            <Briefcase size={16} />
                            <span>{role}</span>
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                            <MapPin size={16} />
                            <span>{location}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <Button className="mt-6">
                View Profile
            </Button>
        </Card>
    );
}