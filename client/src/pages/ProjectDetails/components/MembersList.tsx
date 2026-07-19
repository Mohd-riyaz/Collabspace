import Card from "../../../components/ui/Card/Card";
import mockUserStore from "../../../data/mockUser";

interface MembersListProps {
    workspaceId: string;
}

export default function MembersList({
    workspaceId,
}: MembersListProps) {
    const workspace = mockUserStore
        .getWorkspaces()
        .find((w) => w.id === workspaceId);

    const members = workspace?.members ?? [];

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">
                Members
            </h2>

            {members.length === 0 ? (
                <p className="text-gray-500">
                    No members found.
                </p>
            ) : (
                <div className="space-y-4">
                    {members.map((member, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border rounded-lg p-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />

                                <div>
                                    <h3 className="font-semibold">
                                        {member.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {member.email}
                                    </p>
                                </div>
                            </div>

                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                                {member.role}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}