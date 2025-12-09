import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import {
  getLoggedInUser,
  removeLoggedInUser,
  saveLoggedInUser,
  saveUsers,
} from "../utils/LocalStorage.jsx";

// New functions to manage jobs in localStorage
const getJobs = () => {
  try {
    const jobs = localStorage.getItem("jobs");
    return jobs ? JSON.parse(jobs) : [];
  } catch {
    return [];
  }
};

const saveJobs = (jobs) => {
  localStorage.setItem("jobs", JSON.stringify(jobs));
};

const Profile = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("jobSeeker");
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: "",
  });
  const [currentUser, setCurrentUser] = useState(null);

  // Employer dashboard form state
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    category: "",
    salary: "",
    description: "",
    responsibilities: "",
    requirements: "",
    website: "",
  });

  const loadLoggedUser = () => {
    const user = getLoggedInUser();
    if (user) {
      setCurrentUser(user);
      setUserType(user.role || "jobSeeker");
      setProfileData({
        name: user.name,
        email: user.email,
        bio: user.bio || "",
        skills: user.skills || "",
      });
    } else {
      setCurrentUser(null);
      setProfileData({ name: "", email: "", bio: "", skills: "" });
      setUserType("jobSeeker");
    }
  };

  useEffect(() => {
    loadLoggedUser();
    const handleStorageChange = () => loadLoggedUser();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    const users = getUsers();
    const updatedUsers = users.map((u) =>
      u.email === currentUser.email ? { ...u, ...profileData } : u
    );
    saveUsers(updatedUsers);

    const updatedUser = { ...currentUser, ...profileData };
    saveLoggedInUser(updatedUser);
    setCurrentUser(updatedUser);

    alert("Profile updated!");
  };

  const handlePostJob = () => {
    if (!jobData.title || !jobData.company) {
      alert("Please fill in at least the job title and company.");
      return;
    }

    const jobs = getJobs();
    const newJob = {
      id: Date.now(),
      postedBy: currentUser.email,
      postedDate: new Date().toISOString(),
      ...jobData,
      responsibilities: jobData.responsibilities.split("\n"),
      requirements: jobData.requirements.split("\n"),
    };

    jobs.push(newJob);
    saveJobs(jobs);

    setJobData({
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      category: "",
      salary: "",
      description: "",
      responsibilities: "",
      requirements: "",
      website: "",
    });

    alert("Job posted successfully!");
  };

  const handleLogout = () => {
    removeLoggedInUser();
    navigate("/");
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
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

                {/* Account Type Toggle */}
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
                  {userType === "employer" && (
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        activeTab === "dashboard"
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab("dashboard")}
                    >
                      Dashboard
                    </button>
                  )}
                </div>


              </div>
            </div>

            {/* Content Area */}
            <div className="w-full md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">My Profile</h2>
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
                    <Button
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition-all duration-200 mt-6"
                      onClick={handleSaveProfile}
                    >
                      Save Profile
                    </Button>
                  </div>
                )}

                {/* Employer Dashboard */}
                {activeTab === "dashboard" && userType === "employer" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Job Title"
                        name="title"
                        value={jobData.title}
                        onChange={handleJobChange}
                      />
                      <InputField
                        label="Company"
                        name="company"
                        value={jobData.company}
                        onChange={handleJobChange}
                      />
                      <InputField
                        label="Location"
                        name="location"
                        value={jobData.location}
                        onChange={handleJobChange}
                      />
                      <InputField
                        label="Job Type"
                        name="type"
                        value={jobData.type}
                        onChange={handleJobChange}
                      />
                      <InputField
                        label="Category"
                        name="category"
                        value={jobData.category}
                        onChange={handleJobChange}
                      />
                      <InputField
                        label="Salary"
                        name="salary"
                        value={jobData.salary}
                        onChange={handleJobChange}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 mb-1 font-medium">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows="3"
                        value={jobData.description}
                        onChange={handleJobChange}
                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 mb-1 font-medium">
                        Responsibilities (one per line)
                      </label>
                      <textarea
                        name="responsibilities"
                        rows="3"
                        value={jobData.responsibilities}
                        onChange={handleJobChange}
                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 mb-1 font-medium">
                        Requirements (one per line)
                      </label>
                      <textarea
                        name="requirements"
                        rows="3"
                        value={jobData.requirements}
                        onChange={handleJobChange}
                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mt-4">
                      <InputField
                        label="Website / Apply Link"
                        name="website"
                        value={jobData.website}
                        onChange={handleJobChange}
                      />
                    </div>
                    <Button
                      className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition-all duration-200 mt-6"
                      onClick={handlePostJob}
                    >
                      Post Job
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
