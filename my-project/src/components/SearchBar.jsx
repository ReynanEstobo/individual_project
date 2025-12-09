import React from 'react';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          px-4
          py-3
          pl-12
          border
          border-gray-300
          bg-gray-50
          text-gray-800
          placeholder-gray-400
          rounded-xl
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          focus:border-blue-400
          transition
          duration-200
        "
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-lg">
        🔍
      </div>
    </div>
  );
};

export default SearchBar;
