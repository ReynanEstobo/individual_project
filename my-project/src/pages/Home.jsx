import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import TestimonialCard from "../components/TestimonialCard";
import { mockCategories, mockJobs, mockTestimonials } from "../data/mockData";

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const uniqueJobs = [
      ...new Map(mockJobs.map((job) => [job.id, job])).values(),
    ];
    setFeaturedJobs(uniqueJobs.slice(0, 6));

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % mockTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white min-h-[85vh] flex items-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Find Your Dream Job
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Join thousands of professionals who found their perfect career
              match
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/jobs">
                <Button className="primary bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-lg md:text-xl font-semibold rounded-lg transition duration-300">
                  Browse Jobs
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Featured Jobs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/jobs">
                <Button className="secondary bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg transition duration-300">
                  View All Jobs
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Job Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[
                ...new Map(mockCategories.map((cat) => [cat.id, cat])).values(),
              ].map((category, index) => (
                <motion.div
                  key={category.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Our Users Say
            </h2>
            <motion.div
              className="max-w-3xl mx-auto"
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TestimonialCard
                testimonial={mockTestimonials[currentTestimonial]}
              />
            </motion.div>
            <div className="flex justify-center mt-6 space-x-2">
              {mockTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
