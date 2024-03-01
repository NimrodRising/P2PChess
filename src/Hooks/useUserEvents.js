import { useEffect, useState } from "react";

export const useUserEvents = (bool) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseupEvent, setMouseupEvent] = useState(null);

  useEffect(() => {
    if (bool) {
      const setFromMouseMoveOrDown = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };

      const setFromMouseUp = (e) => {
        setMouseupEvent(e);
      };

      window.addEventListener("mousemove", setFromMouseMoveOrDown);
      window.addEventListener("mousedown", setFromMouseMoveOrDown);
      window.addEventListener("mouseup", setFromMouseUp);
      return () => {
        window.removeEventListener("mousemove", setFromMouseMoveOrDown);
        window.removeEventListener("mousedown", setFromMouseMoveOrDown);
        window.removeEventListener("mouseup", setFromMouseUp);
      };
    }
  }, [bool, position, mouseupEvent]);

  return {
    userPosition: position,
    mouseupEvent: mouseupEvent,
  };
};

export default useUserEvents;
