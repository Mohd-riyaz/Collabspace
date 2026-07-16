import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Settings as SettingsIcon, Users, Trash2, ShieldAlert, Plus, Check } from "lucide-react";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card/Card";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import TextArea from "../../components/ui/TextArea/TextArea";
import RadioGroup, { RadioGroupItem } from "../../components/ui/RadioGroup/RadioGroup";
import mockUserStore, { type Workspace } from "../../data/mockUser";

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceSlug, setWorkspaceSlug] = useState("");
  const [workspaceDesc, setWorkspaceDesc] = useState("");
  const [workspaceColor, setWorkspaceColor] = useState("blue");
  
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Member");
  
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [memberSuccess, setMemberSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reloadData = () => {
    const workspaces = mockUserStore.getWorkspaces();
    const activeId = mockUserStore.getActiveWorkspaceId();
    const active = workspaces.find((w) => w.id === activeId) || workspaces[0];
    
    if (active) {
      setActiveWorkspace(active);
      setWorkspaceName(active.name);
      setWorkspaceSlug(active.slug);
      setWorkspaceDesc(active.description || "");
      setWorkspaceColor(active.color);
    }
  };

  useEffect(() => {
    reloadData();
  }, [location]);

  const handleUpdateDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) {
      setErrors((prev) => ({ ...prev, name: "Workspace name is required." }));
      return;
    }
    if (!workspaceSlug.trim()) {
      setErrors((prev) => ({ ...prev, slug: "Slug cannot be empty." }));
      return;
    }

    const allWorkspaces = mockUserStore.getWorkspaces();
    const list = allWorkspaces.map((w) => {
      if (w.id === activeWorkspace?.id) {
        return {
          ...w,
          name: workspaceName,
          slug: workspaceSlug,
          description: workspaceDesc,
          color: workspaceColor,
        };
      }
      return w;
    });

    mockUserStore.saveWorkspaces(list);
    mockUserStore.addActivity("updated workspace details in", workspaceName);
    setSaveSuccess(true);
    setErrors({});
    setTimeout(() => setSaveSuccess(false), 3000);
    reloadData();
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
      return;
    }
    if (!newMemberName.trim()) {
      setErrors((prev) => ({ ...prev, memberName: "Name is required." }));
      return;
    }

    const allWorkspaces = mockUserStore.getWorkspaces();
    const updated = allWorkspaces.map((w) => {
      if (w.id === activeWorkspace?.id) {
        return {
          ...w,
          members: [
            ...w.members,
            {
              name: newMemberName,
              email: newMemberEmail,
              role: newMemberRole,
              avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?auto=format&fit=crop&w=150&h=150&q=80`,
            },
          ],
        };
      }
      return w;
    });

    mockUserStore.saveWorkspaces(updated);
    mockUserStore.addActivity(`invited ${newMemberName} to`, activeWorkspace?.name || "workspace");
    
    setNewMemberEmail("");
    setNewMemberName("");
    setNewMemberRole("Member");
    setMemberSuccess(true);
    setErrors({});
    setTimeout(() => setMemberSuccess(false), 3000);
    reloadData();
  };

  const handleRemoveMember = (email: string) => {
    if (email === "riyaz@collabspace.com") {
      alert("You cannot remove yourself as owner from workspace settings.");
      return;
    }

    const allWorkspaces = mockUserStore.getWorkspaces();
    const updated = allWorkspaces.map((w) => {
      if (w.id === activeWorkspace?.id) {
        return {
          ...w,
          members: w.members.filter((m) => m.email !== email),
        };
      }
      return w;
    });

    mockUserStore.saveWorkspaces(updated);
    mockUserStore.addActivity("removed member from", activeWorkspace?.name || "workspace");
    reloadData();
  };

  const handleDeleteWorkspace = () => {
    const confirmation = window.confirm(
      `Are you absolutely sure you want to delete the workspace "${activeWorkspace?.name}"? All project roadmaps and Kanban cards will be permanently removed.`
    );

    if (confirmation) {
      const allWorkspaces = mockUserStore.getWorkspaces();
      const filtered = allWorkspaces.filter((w) => w.id !== activeWorkspace?.id);
      
      mockUserStore.saveWorkspaces(filtered);
      
      if (filtered.length > 0) {
        mockUserStore.setActiveWorkspaceId(filtered[0].id);
      } else {
        localStorage.removeItem("collabspace_active_w_id");
      }

      mockUserStore.addActivity("deleted workspace", activeWorkspace?.name || "workspace");
      navigate("/workspaces");
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header section */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white m-0 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
          <span>Workspace Settings</span>
        </h1>
        <p className="text-sm text-gray-500">
          Configure details, add team invitations, and manage membership details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left main forms columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Details Update success banner */}
          {saveSuccess && (
            <div className="flex items-center gap-2.5 p-4 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-450 dark:border-emerald-900 transition-all duration-300">
              <Check className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">Workspace details updated successfully!</span>
            </div>
          )}

          {/* Details Card Form */}
          <Card>
            <CardHeader className="pb-3 border-b border-gray-105 dark:border-gray-850 mb-6">
              <CardTitle className="text-base font-bold">General Details</CardTitle>
              <CardDescription className="text-xs">Customize the title, URL path, and theme colors.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleUpdateDetails} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Workspace Name"
                    id="settings-name"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    error={errors.name}
                    required
                  />

                  <Input
                    label="Workspace URL Slug"
                    id="settings-slug"
                    value={workspaceSlug}
                    onChange={(e) => setWorkspaceSlug(e.target.value)}
                    error={errors.slug}
                    required
                  />
                </div>

                <TextArea
                  label="Description"
                  id="settings-desc"
                  value={workspaceDesc}
                  onChange={(e) => setWorkspaceDesc(e.target.value)}
                  rows={2}
                />

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Workspace Theme Color
                  </label>
                  <RadioGroup
                    value={workspaceColor}
                    onChange={(val) => setWorkspaceColor(val)}
                    name="settings-color"
                  >
                    <RadioGroupItem value="blue" label="Blue Theme" description="Professional blue color theme styling" />
                    <RadioGroupItem value="emerald" label="Emerald Theme" description="Fresh emerald color theme styling" />
                    <RadioGroupItem value="amber" label="Amber Theme" description="Warm amber color theme styling" />
                    <RadioGroupItem value="rose" label="Rose Theme" description="Vibrant rose color theme styling" />
                    <RadioGroupItem value="teal" label="Teal Theme" description="Serene teal color theme styling" />
                  </RadioGroup>
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-auto px-6">
                    Save Details
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Members Table */}
          <Card>
            <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-850 mb-6 flex-row justify-between items-center">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Team Collaborators</span>
                </CardTitle>
                <CardDescription className="text-xs">Manage workspace permissions and roles.</CardDescription>
              </div>
              <span className="text-xs text-gray-400 font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                {activeWorkspace?.members.length} Members
              </span>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-gray-150 dark:border-gray-805 text-gray-400 dark:text-gray-500 uppercase font-bold">
                      <th className="py-2.5">Name</th>
                      <th className="py-2.5">Email</th>
                      <th className="py-2.5">Role</th>
                      <th className="py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-805">
                    {activeWorkspace?.members.map((m, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/20 dark:hover:bg-gray-900/10">
                        <td className="py-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                          <img
                            src={m.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&h=60&q=80"}
                            alt={m.name}
                            className="w-6.5 h-6.5 rounded-full object-cover"
                          />
                          <span>{m.name}</span>
                        </td>
                        <td className="py-3 text-gray-500 dark:text-gray-400">{m.email}</td>
                        <td className="py-3 font-semibold text-gray-700 dark:text-gray-300">
                          {m.role}
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleRemoveMember(m.email)}
                            disabled={m.email === "riyaz@collabspace.com"}
                            className="text-gray-400 hover:text-red-655 p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side widgets column */}
        <div className="space-y-8">
          {/* Member Success alerts */}
          {memberSuccess && (
            <div className="flex items-center gap-2.5 p-4 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900 transition-all duration-300">
              <Check className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">Invitation dispatched successfully!</span>
            </div>
          )}

          {/* Quick Invite Form Card */}
          <Card>
            <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-850 mb-6">
              <CardTitle className="text-base font-bold flex items-center gap-1">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>Invite Member</span>
              </CardTitle>
              <CardDescription className="text-xs">Add new members to active workspace.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleAddMember} className="space-y-4">
                <Input
                  label="Name"
                  id="invite-name"
                  placeholder="e.g. Sarah Jenkins"
                  value={newMemberName}
                  onChange={(e) => {
                    setNewMemberName(e.target.value);
                    if (errors.memberName) setErrors((prev) => ({ ...prev, memberName: "" }));
                  }}
                  error={errors.memberName}
                  required
                />

                <Input
                  label="Email"
                  id="invite-email"
                  placeholder="sarah@company.com"
                  value={newMemberEmail}
                  onChange={(e) => {
                    setNewMemberEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  error={errors.email}
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Role Permission
                  </label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="w-full text-sm rounded-lg border border-gray-350 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="Admin">Admin (Full Control)</option>
                    <option value="Member">Member (Read & Write)</option>
                    <option value="Guest">Guest (Read Only)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <Button type="submit">Invite Member</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-950 bg-red-50/5">
            <CardHeader className="pb-3 border-b border-red-100 dark:border-red-955/20 mb-6 flex-row gap-2 items-center text-red-655 dark:text-red-400">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <div>
                <CardTitle className="text-base font-bold m-0 text-red-655 dark:text-red-400">Danger Zone</CardTitle>
                <CardDescription className="text-[10px] text-red-500/80">High-risk workspace configurations.</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Deleting this workspace is permanent. All project boards, task checklists, active templates, and invitation lists will be permanently deleted. This cannot be undone.
              </p>
              <button
                type="button"
                onClick={handleDeleteWorkspace}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition cursor-pointer shadow-sm text-center block"
              >
                Delete Workspace
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
