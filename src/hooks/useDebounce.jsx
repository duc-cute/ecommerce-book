/** @format */

import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedvalue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedvalue(value), delay);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
