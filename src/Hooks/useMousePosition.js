import { useEffect, useState } from "react";
export const useMousePosition = (bool) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    bool && window.addEventListener("mousemove", setFromEvent);
    return () => {
      bool && window.removeEventListener("mousemove", setFromEvent);
    };
  }, [bool]);

  return position;
};

export default useMousePosition;
