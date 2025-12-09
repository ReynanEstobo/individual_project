import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mockJobs } from "../data/mockData";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find((job) => job.id === parseInt(id));

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Job not found</h2>
            <p className="text-gray-600 mb-4">
              The job you are looking for does not exist.
            </p>
            <Button className="primary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {job.title}
                </h1>
                <p className="text-blue-600 font-medium">{job.company}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {job.type}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
              <span>📍 {job.location}</span>
              <span>💰 {job.salary}</span>
              <span>
                🗓 Posted on {new Date(job.postedDate).toLocaleDateString()}
              </span>
            </div>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Job Description</h2>
              <p className="text-gray-700">{job.description}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-700">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Requirements</h2>
              <ul className="list-disc list-inside text-gray-700">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <div className="flex justify-between items-center mt-8">
              <Link to={`/jobs`}>
                <Button className="secondary bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-2 rounded-lg transition duration-300">
                  Back to Jobs
                </Button>
              </Link>
              <a href={job.website} target="_blank" rel="noopener noreferrer">
                <Button className="primary bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg transition duration-300">
                  Apply Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetails;
