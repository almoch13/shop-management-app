import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface InputNumberFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputNumberField: React.FC<InputNumberFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="flex justify-between space-x-4 items-center my-4 p-0.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={id}
        name={name}
        type="Number"
        value={value}
        onChange={onChange}
        className="w-1/2"
      />
    </div>
  );
};

export default InputNumberField;
