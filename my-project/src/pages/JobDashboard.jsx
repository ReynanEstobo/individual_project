import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { getJobs, getLoggedInUser, saveJobs } from "../utils/LocalStorage.jsx";

const JobDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    type: "Full-time",
    location: "",
    category: "Technology",
    salary: "",
    description: "",
    responsibilities: "",
    requirements: "",
    website: "",
    postedDate: new Date().toISOString(),
  });

  useEffect(() => {
    const user = getLoggedInUser();
    if (!user || user.role !== "employer") {
      navigate("/"); // redirect non-employers
    } else {
      setCurrentUser(user);
    }

    const storedJobs = getJobs();
    setJobs(storedJobs);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddJob = () => {
    if (!newJob.title || !newJob.company || !newJob.location) {
      alert(
        "Please fill in all required fields: Title, Company, and Location."
      );
      return;
    }

    const jobWithId = {
      ...newJob,
      id: jobs.length > 0 ? Math.max(...jobs.map((j) => j.id)) + 1 : 1,
      employerId: currentUser.id,
      responsibilities: newJob.responsibilities
        ? newJob.responsibilities
            .split("\n")
            .map((r) => r.trim())
            .filter(Boolean)
        : [],
      requirements: newJob.requirements
        ? newJob.requirements
            .split("\n")
            .map((r) => r.trim())
            .filter(Boolean)
        : [],
      postedDate: new Date().toISOString(),
    };

    const updatedJobs = [...jobs, jobWithId];
    setJobs(updatedJobs);
    saveJobs(updatedJobs);

    alert("Job posted successfully!");
    setNewJob({
      title: "",
      company: "",
      type: "Full-time",
      location: "",
      category: "Technology",
      salary: "",
      description: "",
      responsibilities: "",
      requirements: "",
      website: "",
      postedDate: new Date().toISOString(),
    });
  };

  const employerJobs = jobs.filter((job) => job.employerId === currentUser?.id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Post New Job */}
        <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
        <div className="bg-white p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Job Title"
            name="title"
            value={newJob.title}
            onChange={handleChange}
          />
          <InputField
            label="Company"
            name="company"
            value={newJob.company}
            onChange={handleChange}
          />
          <InputField
            label="Job Type"
            name="type"
            value={newJob.type}
            onChange={handleChange}
            select
            options={["Full-time", "Part-time", "Contract"]}
          />
          <InputField
            label="Location"
            name="location"
            value={newJob.location}
            onChange={handleChange}
          />
          <InputField
            label="Category"
            name="category"
            value={newJob.category}
            onChange={handleChange}
            select
            options={[
              "Technology",
              "Marketing",
              "Healthcare",
              "Finance",
              "Education",
              "Design",
              "Sales",
              "Customer Service",
            ]}
          />
          <InputField
            label="Salary"
            name="salary"
            value={newJob.salary}
            onChange={handleChange}
          />
          <InputField
            label="Website / Apply Link"
            name="website"
            value={newJob.website}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={newJob.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">
              Responsibilities (one per line)
            </label>
            <textarea
              name="responsibilities"
              value={newJob.responsibilities}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">
              Requirements (one per line)
            </label>
            <textarea
              name="requirements"
              value={newJob.requirements}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <Button
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          onClick={handleAddJob}
        >
          Post Job
        </Button>

        {/* Employer's Posted Jobs */}
        {employerJobs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">My Posted Jobs</h2>
            <div className="space-y-4">
              {employerJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-gray-600">
                        {job.company} - {job.location} ({job.category})
                      </p>
                      <span className="text-gray-500 text-sm">{job.type}</span>
                    </div>
                    <span className="text-gray-600 font-medium">
                      {job.salary}
                    </span>
                  </div>

                  <p className="text-gray-700 mt-2">{job.description}</p>

                  {job.requirements.length > 0 && (
                    <div className="mt-2">
                      <strong>Requirements:</strong>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {job.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.responsibilities.length > 0 && (
                    <div className="mt-2">
                      <strong>Responsibilities:</strong>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {job.responsibilities.map((res, idx) => (
                          <li key={idx}>{res}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.website && (
                    <a
                      href={job.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline mt-2 inline-block"
                    >
                      Company Website
                    </a>
                  )}

                  <p className="text-gray-500 mt-2 text-sm">
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDashboard;
