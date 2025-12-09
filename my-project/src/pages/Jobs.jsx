import { useEffect, useState } from "react";
import Button from "../components/Button";
import FilterDropdown from "../components/FilterDropdown";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { mockJobs } from "../data/mockData";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  useEffect(() => {
    let result = jobs;

    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (jobTypeFilter)
      result = result.filter((job) => job.type === jobTypeFilter);
    if (locationFilter)
      result = result.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    if (categoryFilter)
      result = result.filter((job) => job.category === categoryFilter);

    setFilteredJobs(result);
    setCurrentPage(1);
  }, [searchTerm, jobTypeFilter, locationFilter, categoryFilter, jobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const resetFilters = () => {
    setSearchTerm("");
    setJobTypeFilter("");
    setLocationFilter("");
    setCategoryFilter("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-800">
            Browse Jobs
          </h1>

          {/* Search and Filters */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-12">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title, company, or keywords..."
              className="mb-6"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FilterDropdown
                label="Job Type"
                options={["Full-time", "Part-time", "Contract"]}
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
              />
              <FilterDropdown
                label="Location"
                options={[
                  "Manila",
                  "Quezon City",
                  "Cebu City",
                  "Davao City",
                  "Makati",
                  "Taguig",
                  "Baguio",
                  "Iloilo City",
                  "Cagayan de Oro",
                  "Pasig",
                  "Other",
                ]}
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
              <FilterDropdown
                label="Category"
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <p className="text-gray-700 text-lg">
                Showing{" "}
                <span className="font-semibold">{filteredJobs.length}</span>{" "}
                jobs
              </p>
              <Button
                className="secondary bg-gray-100 text-gray-800 hover:bg-gray-200 px-6 py-2 rounded-xl transition duration-300"
                onClick={resetFilters}
                disabled={
                  !searchTerm &&
                  !jobTypeFilter &&
                  !locationFilter &&
                  !categoryFilter
                }
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="col-span-full bg-white rounded-3xl shadow-xl p-10 text-center">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters
                </p>
                <Button
                  className="primary bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-xl transition duration-300"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredJobs.length > jobsPerPage && (
            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
