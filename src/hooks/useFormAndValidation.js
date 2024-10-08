
import {useState, useCallback} from 'react';

export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(true);
    
  const handleChange = (e) => {
    const {name, value, validationMessage} = e.target    
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues, newErrors, newIsValid) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

