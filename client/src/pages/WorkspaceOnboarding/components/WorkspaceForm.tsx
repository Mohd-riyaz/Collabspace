import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import TextArea from "../../../components/ui/TextArea/TextArea";
import RadioGroup, { RadioGroupItem } from "../../../components/ui/RadioGroup/RadioGroup";
import mockUserStore from "../../../data/mockUser";
import { Plus, X, Users, Paintbrush, FileText } from "lucide-react";

export default function WorkspaceForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "blue",
  });
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({ ...prev, name, slug }));
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    // Simple email validation
    if (!inviteEmail.includes("@")) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
      return;
    }

    if (!invitedMembers.includes(inviteEmail)) {
      setInvitedMembers((prev) => [...prev, inviteEmail]);
    }
    setInviteEmail("");
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handleRemoveMember = (email: string) => {
    setInvitedMembers((prev) => prev.filter((m) => m !== email));
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) {
        setErrors((prev) => ({ ...prev, name: "Workspace name is required." }));
        return;
      }
      if (!formData.slug.trim()) {
        setErrors((prev) => ({ ...prev, slug: "URL slug is required." }));
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const membersList = [
      { name: "Riyaz Ahmed", email: "riyaz@collabspace.com", role: "Admin", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
      ...invitedMembers.map((email) => ({
        name: email.split("@")[0],
        email,
        role: "Member",
      })),
    ];

    const newWorkspace = mockUserStore.addWorkspace({
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      color: formData.color,
      members: membersList,
    });

    mockUserStore.setActiveWorkspaceId(newWorkspace.id);
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-150 dark:border-gray-800/80 p-8 transition-colors duration-200 text-left">
      {/* Progress Tracker */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition ${
            step >= 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
          }`}>
            1
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Details</span>
        </div>
        <div className="flex-1 h-0.5 mx-4 bg-gray-200 dark:bg-gray-800">
          <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }} />
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition ${
            step >= 2 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
          }`}>
            2
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Style</span>
        </div>
        <div className="flex-1 h-0.5 mx-4 bg-gray-200 dark:bg-gray-800">
          <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: step <= 2 ? "0%" : "100%" }} />
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition ${
            step >= 3 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
          }`}>
            3
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Team</span>
        </div>
      </div>

      {/* Form Content */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <span>Create a new workspace</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Workspaces are shared spaces where your team can organize projects and tasks.
            </p>
          </div>

          <Input
            label="Workspace Name"
            id="workspace-name"
            placeholder="e.g. Acme Corp, Marketing Team"
            value={formData.name}
            onChange={handleNameChange}
            error={errors.name}
            required
          />

          <div className="space-y-2">
            <Input
              label="Workspace URL Slug"
              id="workspace-slug"
              placeholder="acme-corp"
              value={formData.slug}
              onChange={handleSlugChange}
              error={errors.slug}
              required
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-normal">
              Your workspace URL: <span className="font-semibold text-blue-600 dark:text-blue-400">collabspace.com/w/{formData.slug || "your-slug"}</span>
            </p>
          </div>

          <TextArea
            label="Description (Optional)"
            id="workspace-desc"
            placeholder="Describe what your team works on in this workspace..."
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
          />

          <div className="pt-2">
            <Button onClick={handleNextStep}>
              Next Step
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Paintbrush className="w-6 h-6 text-blue-600" />
              <span>Choose your workspace theme</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pick a theme color to identify this workspace in the sidebar.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme Color
            </label>
            <RadioGroup
              value={formData.color}
              onChange={(val) => setFormData((prev) => ({ ...prev, color: val }))}
              name="theme-color"
            >
              <RadioGroupItem value="blue" label="Blue Theme" description="Professional, trust-oriented, clear styling" />
              <RadioGroupItem value="emerald" label="Emerald Theme" description="Creative, fresh, product-oriented" />
              <RadioGroupItem value="amber" label="Amber Theme" description="Warm, active, operations-oriented" />
              <RadioGroupItem value="rose" label="Rose Theme" description="Vibrant, energy-driven design" />
              <RadioGroupItem value="teal" label="Teal Theme" description="Serene, technical, structured design" />
            </RadioGroup>
          </div>

          <div className="flex gap-4 pt-2">
            <Button variant="secondary" onClick={handlePrevStep}>
              Back
            </Button>
            <Button onClick={handleNextStep}>
              Next Step
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              <span>Invite team members</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add collaborators to your workspace. You can also invite them later.
            </p>
          </div>

          <form onSubmit={handleAddMember} className="flex gap-2 items-end">
            <div className="flex-1">
              <Input
                label="Email Address"
                id="invite-email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                error={errors.email}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-755 h-[42px] px-4 rounded-md transition font-medium flex items-center justify-center cursor-pointer shadow-sm mb-[2px]"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          {invitedMembers.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400 dark:text-gray-550 uppercase tracking-wider">
                Invited Collaborators
              </label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                {invitedMembers.map((email) => (
                  <div
                    key={email}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-105 text-xs font-medium dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900"
                  >
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(email)}
                      className="hover:text-red-500 transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <Button variant="secondary" onClick={handlePrevStep}>
              Back
            </Button>
            <Button onClick={handleSubmit}>
              Create Workspace
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
