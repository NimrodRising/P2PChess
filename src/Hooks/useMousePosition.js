import { useEffect, useState } from "react";

export const useMousePosition = (bool) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) =>
      setPosition(bool ? { x: e.clientX, y: e.clientY } : null);
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, [bool]);

  return position;
};

export default useMousePosition;
