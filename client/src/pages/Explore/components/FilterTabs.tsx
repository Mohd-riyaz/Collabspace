interface FilterTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const tabs = [
    "All",
    "Workspaces",
    "Projects",
    "People",
];

export default function FilterTabs({
    activeTab,
    onTabChange,
}: FilterTabsProps) {
    return (
        <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition
            ${activeTab === tab
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}