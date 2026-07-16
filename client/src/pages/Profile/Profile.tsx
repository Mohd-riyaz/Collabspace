import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User as UserIcon, Shield, Camera, CheckCircle } from "lucide-react";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card/Card";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import TextArea from "../../components/ui/TextArea/TextArea";
import mockUserStore, { type User } from "../../data/mockUser";

export default function Profile() {
  const location = useLocation();
  const [profile, setProfile] = useState<User>({
    id: "",
    name: "",
    email: "",
    avatar: "",
    role: "",
    bio: "",
    title: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setProfile(mockUserStore.getMockUser());
  }, [location]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name cannot be empty." }));
      return;
    }
    if (!profile.email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email cannot be empty." }));
      return;
    }

    mockUserStore.saveMockUser(profile);
    
    // Trigger success alert
    setSaveSuccess(true);
    setErrors({});
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword) {
      setErrors((prev) => ({ ...prev, oldPassword: "Old password is required." }));
      return;
    }
    if (newPassword.length < 6) {
      setErrors((prev) => ({ ...prev, newPassword: "Password must be at least 6 characters." }));
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
      return;
    }

    // Success response
    setPasswordSuccess(true);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header section */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white m-0 flex items-center gap-2">
          <UserIcon className="w-6 h-6 text-blue-600" />
          <span>My Profile</span>
        </h1>
        <p className="text-sm text-gray-500">
          Manage your personal details, avatar image simulation, and password credentials.
        </p>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side avatar card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto group">
              <img
                src={profile.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover border-2 border-gray-200 dark:border-gray-800 group-hover:brightness-90 transition"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-md hover:bg-blue-700 transition cursor-pointer"
                title="Change Avatar (Mock)"
                onClick={() => alert("Avatar uploading simulator. Connect S3 storage to bind actual images.")}
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="leading-normal">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">{profile.name}</h3>
              <p className="text-xs text-gray-500">{profile.title || "Developer"}</p>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-850 pt-4 flex flex-col items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <span className="font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400">
                {profile.role}
              </span>
              <span>Joined July 2026</span>
            </div>
          </CardContent>
        </Card>

        {/* Right Side forms panel */}
        <div className="lg:col-span-2 space-y-8">
          {/* Success Alerts */}
          {saveSuccess && (
            <div className="flex items-center gap-2.5 p-4 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900 transition-all duration-300">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">Profile details updated successfully!</span>
            </div>
          )}

          {/* Edit Profile Form */}
          <Card>
            <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-850 mb-6">
              <CardTitle className="text-base font-bold">Profile Details</CardTitle>
              <CardDescription className="text-xs">Update your public identification card details.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    id="profile-name"
                    value={profile.name}
                    onChange={(e) => {
                      setProfile((prev) => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    error={errors.name}
                    required
                  />

                  <Input
                    label="Job Title"
                    id="profile-title"
                    placeholder="e.g. Lead Designer, Backend Engineer"
                    value={profile.title}
                    onChange={(e) => setProfile((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <Input
                  label="Email Address"
                  id="profile-email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => {
                    setProfile((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  error={errors.email}
                  required
                />

                <TextArea
                  label="Biography"
                  id="profile-bio"
                  placeholder="Tell your team about yourself, links, schedules..."
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />

                <div className="pt-2">
                  <Button type="submit" className="w-auto px-6">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Password Success Alert */}
          {passwordSuccess && (
            <div className="flex items-center gap-2.5 p-4 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-105 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900 transition-all duration-300">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">Password modified successfully!</span>
            </div>
          )}

          {/* Change Password Card */}
          <Card>
            <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-850 mb-6">
              <CardTitle className="text-base font-bold flex items-center gap-1.5">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Change Password</span>
              </CardTitle>
              <CardDescription className="text-xs">Secure your account by updating credentials.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input
                  label="Current Password"
                  id="old-pw"
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) => {
                    setPasswordData((prev) => ({ ...prev, oldPassword: e.target.value }));
                    if (errors.oldPassword) setErrors((prev) => ({ ...prev, oldPassword: "" }));
                  }}
                  error={errors.oldPassword}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="New Password"
                    id="new-pw"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => {
                      setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }));
                      if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: "" }));
                    }}
                    error={errors.newPassword}
                    required
                  />

                  <Input
                    label="Confirm New Password"
                    id="confirm-pw"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => {
                      setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }));
                      if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    }}
                    error={errors.confirmPassword}
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-auto px-6">
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
