import { ChangeEvent } from "react";

export const Input = ({
  onChangeValue,
  placeholder,
  value,
}: {
  onChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
}) => (
  <input
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={onChangeValue}
  />
);
