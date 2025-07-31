export const Input = ({
  onChangeValue,
  placeholder,
  type = "text",
  value,
}: {
  onChangeValue: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) => (
  <input
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChangeValue(e.target.value)}
  />
);
