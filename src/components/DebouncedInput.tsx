// A debounced input react component
import React from 'react';
import Form from 'react-bootstrap/Form';

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(
    () => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );

  return <Form.Control {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}
