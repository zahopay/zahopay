import React, {useState} from 'react'

const InputFields = ({ id, label, type, name, setValue }) => {
      const [hasValue, setHasValue] = useState(false);

      const handleInputChange = (e) => {
        setHasValue(!!e.target.value);
        setValue(e.target.value);
      };

      const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative mt-5">
      <input
        type={type}
        id={id}
        required
        className="w-full border border-gray-300 px-4 py-2 outline-none rounded-md focus:border-blue-500"
        placeholder=" "
        onChange={handleInputChange}
        name={name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label
        htmlFor={id}
        className={`absolute left-2 top-2 transform -translate-y-0 text-gray-500 bg-white px-1 text-sm transition-all duration-200 pointer-events-none 
          ${hasValue || isFocused ? "top-[-20%] -translate-y-0 text-xs" : ""}`}
      >
        {label} <span className="text-[12px]">*</span>
      </label>
    </div>
  );
};

export default InputFields
