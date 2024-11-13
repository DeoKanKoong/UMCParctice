import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

export const useForm = ({ initialValue, validate }) => {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleValidation = (name) => {
    const validationErrors = validate(values);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name] || ""
    }));
  };

  const register = (name) => ({
    onChange: (e) => {
      setValues((prev) => ({ ...prev, [name]: e.target.value }));
      handleValidation(name); 
    },
    onBlur: () => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      handleValidation(name); 
    },
    name,
    value: values[name] || '',
  });

  return { register, errors, touched, values };
};

export default useForm;
