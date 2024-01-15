import React, { forwardRef, useId } from "react";

const Select = forwardRef(function Select(
  { options, label, classname = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
      >
        <option className="text-xs">
          {label}
        </option>
        {options?.map((option) => (
          <option className="p-2" key={option._id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
