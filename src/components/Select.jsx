import React, { forwardRef, useId } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectComponent = forwardRef(function Select(
  {
    options,
    label,
    classname = "",
    placeholder = "select an option",
    onChange,
    value,
    ...props
  },
  ref
) {
  const id = useId();
  return (
    // <div className="w-full">
    //   {label && <label htmlFor={id}></label>}
    //   <select
    //     onChange={onChange}
    //     value={value}
    //     {...props}
    //     id={id}
    //     ref={ref}
    //     className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
    //   >
    //     <option className="text-xs">{label}</option>
    //     {options?.map((option) => (
    //       <option className="p-2" key={option._id} value={option._id}>
    //         {option.name}
    //       </option>
    //     ))}
    //   </select>
    // </div>
    <Select
      id={id}
      ref={ref}
      onChange={onChange}
      value={value}
      {...props}
      className={`${classname}`}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options?.map((option) => (
            <SelectItem key={option._id} value={option.name}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default SelectComponent;
