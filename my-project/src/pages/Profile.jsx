import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import InputField from "../components/InputField";

import { 
  getUsers, 
  saveUsers, 
  getLoggedInUser, 
  saveLoggedInUser 
} from "../utils/LocalStorage";

const Profile = () => {
  const [userType, setUserType] = useState("jobSeeker");
  const [activeTab, setActiveTab] = useState("profile");

  // -----------------------------
  // Load logged-in user
  // -----------------------------
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getLoggedInUser();
    if (user) {
      setCurrentUser(user);
      setUserType(user.role);
      setProfileData({
        name: user.name,
        email: user.email,
        bio: user.bio || "",
        skills: user.skills || "",
      });
    }
  }, []);

  // -----------------------------------
  // Redirect if not logged in
  // -----------------------------------
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">You are not logged in.</p>
      </div>
    );
  }

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------------
  // SAVE PROFILE TO LOCALSTORAGE
  // -----------------------------------
  const handleSaveProfile = () => {
    let users = getUsers();

    // Update the user inside the USERS array
    const updatedUsers = users.map((u) => {
      if (u.email === currentUser.email) {
        return {
          ...u,
          ...profileData,
        };
      }
      return u;
    });

    saveUsers(updatedUsers);

    // Update the LOGGED-IN USER data
    const updatedUser = { ...currentUser, ...profileData };
    saveLoggedInUser(updatedUser);
    setCurrentUser(updatedUser);

    alert("Profile updated!");
  };

  // Resume Upload (Mock)
  const handleUploadResume = () => {
    alert("Resume upload feature will be added later.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb  -6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-blue-600">
                      {currentUser.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{currentUser.name}</h2>
                    <p className="text-gray-600">{currentUser.email}</p>
                  </div>
                </div>

                {/* Toggle user type */}
                <div className="mb-6">
                  <h3 className="font-bold mb-2">Account Type</h3>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 rounded-lg ${
                        userType === "jobSeeker"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => setUserType("jobSeeker")}
                    >
                      Job Seeker
                    </button>

                    <button
                      className={`px-3 py-1 rounded-lg ${
                        userType === "employer"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => setUserType("employer")}
                    >
                      Employer
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="space-y-2">
                  <button
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      activeTab === "profile"
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    Profile
                  </button>

                  {userType === "jobSeeker" && (
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        activeTab === "applications"
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab("applications")}
                    >
                      My Applications
                    </button>
                  )}

                  {userType === "employer" && (
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        activeTab === "postedJobs"
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab("postedJobs")}
                    >
                      Posted Jobs
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="w-full md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">My Profile</h2>

                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Full Name"
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                      />

                      <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-gray-700 mb-1 font-medium">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        rows="3"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {userType === "jobSeeker" && (
                      <div className="mt-4">
                        <label className="block text-gray-700 mb-1 font-medium">
                          Skills
                        </label>
                        <input
                          type="text"
                          name="skills"
                          value={profileData.skills}
                          onChange={handleProfileChange}
                          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    {/* Resume Section */}
                    {userType === "jobSeeker" && (
                      <div className="mt-6">
                        <h3 className="text-lg font-bold mb-2">Resume</h3>
                        <div className="border-2 border-dashed p-6 text-center rounded-lg">
                          <p className="text-gray-600 mb-3">No resume uploaded</p>
                          <Button className="primary" onClick={handleUploadResume}>
                            Upload Resume
                          </Button>
                        </div>
                      </div>
                    )}

                    <Button className="primary mt-6" onClick={handleSaveProfile}>
                      Save Profile
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
