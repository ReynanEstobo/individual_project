import React from 'react';

const FilterDropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;