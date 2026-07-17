import Card from "../../../components/ui/Card/Card";

interface Props {
    project: {
        description: string;
    };
}

export default function ProjectOverview({
    project,
}: Props) {
    return (
        <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">
                Overview
            </h2>

            <p className="text-gray-600">
                {project.description}
            </p>
        </Card>
    );
}