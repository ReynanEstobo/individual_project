import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import { getLoggedInUser, saveUsers, saveLoggedInUser, removeLoggedInUser } from "../utils/LocalStorage.jsx";

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

  const handleLogout = () => {
    removeLoggedInUser();
    navigate("/"); // redirect to home/login
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
                        userType === "jobSeeker" ? "bg-blue-600 text-white" : "bg-gray-200"
                      }`}
                      onClick={() => setUserType("jobSeeker")}
                    >
                      Job Seeker
                    </button>
                    <button
                      className={`px-3 py-1 rounded-lg ${
                        userType === "employer" ? "bg-blue-600 text-white" : "bg-gray-200"
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
                      activeTab === "profile" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    Profile
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6">
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
                      <label className="block text-gray-700 mb-1 font-medium">Bio</label>
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
                        <label className="block text-gray-700 mb-1 font-medium">Skills</label>
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
