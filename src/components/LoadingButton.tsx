import { ReactNode } from 'react';
import { Button, Spinner, ButtonProps } from 'react-bootstrap';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  children: ReactNode;
}

const LoadingButton = ({ loading, children, ...buttonProps }: LoadingButtonProps) => {
  return (
    <Button disabled={loading} {...buttonProps}>
      {loading ? (
        <Spinner as="span" animation="border" role="status" size="sm" aria-hidden="true">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
