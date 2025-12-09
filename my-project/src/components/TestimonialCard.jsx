import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <span className="text-blue-600 font-bold">{testimonial.name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-gray-600 text-sm">{testimonial.role} at {testimonial.company}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{testimonial.content}"</p>
    </div>
  );
};

export default TestimonialCard;