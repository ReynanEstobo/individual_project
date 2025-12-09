import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <span className="text-4xl mb-4">{category.icon}</span>
      <h3 className="text-lg font-bold">{category.name}</h3>
      <p className="text-gray-500 mt-2">124 jobs available</p>
    </div>
  );
};

export default CategoryCard;