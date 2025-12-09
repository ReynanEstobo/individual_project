const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className="mb-5 relative">
      {label && (
        <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-lg border
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          transition duration-300 ease-in-out
          ${error ? "border-red-400" : "border-gray-300"}
          hover:border-gray-400
        `}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default InputField;
