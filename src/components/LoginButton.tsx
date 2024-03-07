import { Button, ButtonProps } from 'react-bootstrap';
import { handleLogin } from '../utils/firebase.ts';

type LoginButtonProps = ButtonProps;

export const LoginButton = ({ ...buttonProps }: LoginButtonProps) => {
  return (
    <Button onClick={handleLogin} {...buttonProps}>
      Log In
    </Button>
  );
};
