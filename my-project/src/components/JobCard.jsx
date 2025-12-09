import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold mb-1">{job.title}</h3>
          <p className="text-blue-600 font-medium">{job.company}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {job.type}
        </span>
      </div>
      
      <div className="flex items-center mt-4 text-gray-600">
        <span className="mr-4">📍 {job.location}</span>
        <span>💰 {job.salary}</span>
      </div>
      
      <p className="text-gray-600 mt-3 line-clamp-2">{job.description}</p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500 text-sm">Posted on {new Date(job.postedDate).toLocaleDateString()}</span>
        <Link to={`/job/${job.id}`}>
          <Button className="primary">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;