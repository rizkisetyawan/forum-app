import { useState } from 'react';

function useInput(defaultValue = '', type = 'text') {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange(e) {
    if (type === 'text') {
      setValue(e.target.value);
    }
    if (type === 'textarea') {
      setValue(e.currentTarget.value);
    }
  }

  return [value, handleValueChange, setValue];
}

export default useInput;
