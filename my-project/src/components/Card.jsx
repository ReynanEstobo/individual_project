import React from 'react';
import Button from './Button';

const Card = ({ title, description, image, action }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {image && (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-4xl">{image}</span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {action && (
          <Button className="w-full">{action}</Button>
        )}
      </div>
    </div>
  );
};

export default Card;