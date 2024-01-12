import React, { forwardRef, useId } from "react";

const Input = forwardRef(function input(
  { label, type = "text", classname = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${classname} block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;

