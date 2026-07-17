import { useState } from "react";

import ProjectHeader from "./components/ProjectHeader";
import ProjectTabs from "./components/ProjectTabs";
import ProjectOverview from "./components/ProjectOverview";
import TaskSummary from "./components/TaskSummary";
import MembersList from "./components/MembersList";
import RecentActivity from "./components/RecentActivity";
import FilesSection from "./components/FilesSection";

export default function ProjectDetails() {
    const [activeTab, setActiveTab] = useState("overview");

    const project = {
        id: 1,
        name: "CollabSpace",
        description: "Modern collaboration platform for teams.",
        priority: "High",
        progress: 72,
        dueDate: "28 Jul 2026",
    };

    return (
        <div className="p-8 space-y-8">
            <ProjectHeader project={project} />

            <ProjectTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {activeTab === "overview" && (
                <>
                    <ProjectOverview project={project} />
                    <TaskSummary />
                    <MembersList />
                    <RecentActivity />
                </>
            )}

            {activeTab === "files" && <FilesSection />}
        </div>
    );
}