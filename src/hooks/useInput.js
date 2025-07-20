import { useState } from "react";

export default function useInput(initialValue, valitdationFn) {
  const [value, setValue] = useState(initialValue);
  const [isEdited, setIsEdited] = useState(false);

  const isValid = valitdationFn(value);

  function handleInputBlur(e) {
    setIsEdited(true);
  }

  function handleInputChange(e) {
    setValue(e.target.value);
    setIsEdited(false);
  }

  return {
    value,
    handleInputBlur,
    handleInputChange,
    hasError: isEdited && !isValid,
  };
}
