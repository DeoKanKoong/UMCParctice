import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

export const useForm = (schema) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (callback) => (event) => {
    event.preventDefault();
    const result = schema.safeParse(values);
    if (result.success) {
      callback(result.data);
    } else {
      setErrors(result.error.flatten().fieldErrors);
    }
  };

  const register = (name) => ({
    onChange: (e) => setValues((prev) => ({ ...prev, [name]: e.target.value })),
    onBlur: () => {
      const result = schema.safeParse(values);
      setErrors(result.success ? {} : result.error.flatten().fieldErrors);
    },
    name,
    value: values[name] || ''
  });

  return { register, handleSubmit, errors, values };
};
