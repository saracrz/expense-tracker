import { Input } from "../Input";

export const LoginForm = ({
  emailValue,
  onChangeEmail,
  onChangePassword,
  passwordValue,
}: {
  emailValue: string;
  passwordValue: string;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
}) => {
  return (
    <div>
      <h2>Login to your account</h2>
      <Input
        placeholder="Email"
        type="email"
        value={emailValue}
        onChangeValue={onChangeEmail}
      />
      <Input
        placeholder="Password"
        type="password"
        value={passwordValue}
        onChangeValue={onChangePassword}
      />
    </div>
  );
};
