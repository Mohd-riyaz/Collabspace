interface Props {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const tabs = [
    "overview",
    "tasks",
    "members",
    "files",
    "activity",
    "settings",
];

export default function ProjectTabs({
    activeTab,
    setActiveTab,
}: Props) {
    return (
        <div className="flex gap-6 border-b pb-3">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`capitalize font-semibold ${activeTab === tab
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}