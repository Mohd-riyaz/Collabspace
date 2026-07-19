import { useState } from "react";
import { useParams } from "react-router-dom";
import mockUserStore from "../../data/mockUser";

import ProjectHeader from "./components/ProjectHeader";
import ProjectTabs from "./components/ProjectTabs";
import ProjectOverview from "./components/ProjectOverview";
import TaskSummary from "./components/TaskSummary";
import MembersList from "./components/MembersList";
import RecentActivity from "./components/RecentActivity";
import FilesSection from "./components/FilesSection";
export default function ProjectDetails() {
    const [activeTab, setActiveTab] = useState("overview");
    const { projectId } = useParams();
    const project = mockUserStore
        .getProjects()
        .find((p) => String(p.id) === projectId);
    if (!project) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold">
                    Project Not Found
                </h1>
            </div>
        );
    }
    console.log("Project ID from URL:", projectId);
    console.log("All Projects:", mockUserStore.getProjects());
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
                    <TaskSummary projectId={project.id} />
                    <MembersList workspaceId={project.workspaceId} />
                    <RecentActivity />
                </>
            )}

            {activeTab === "files" && <FilesSection />}
        </div>
    );
}