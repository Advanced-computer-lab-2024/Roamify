import React from "react";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  disabled,
  ...props
}) => {
  const handleChange = (e) => {
    // Trigger the parent's onChange function with field name and value
    onChange(name, e.target.value);
  };

  return (
    <label className="flex flex-col">
      {label}:
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          className="p-2 border rounded-md mt-1"
          disabled={disabled}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="p-2 border rounded-md mt-1"
          disabled={disabled}
          {...props}
        />
      )}
    </label>
  );
};

export default InputField;
