import { Label } from "@radix-ui/react-dropdown-menu";
import React, { forwardRef, useId } from "react";
import { Input } from "./ui/input";

const InputDiv = forwardRef(function input(
  { label, type = "text", classname = "", placeholder = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="my-3">
      <Label htmlFor={id}>{label}</Label>
      <Input
        className={classname}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default InputDiv;
