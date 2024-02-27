import { useEffect, useState } from "react";

const useMouseUpEvent = () => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    function setFromEvent(event) {
      setEvent(event);
    }
    window.addEventListener("mouseup", setFromEvent);
    return () => {
      window.removeEventListener("mouseup", setFromEvent);
    };
  }, [event]);
  return event;
};

export default useMouseUpEvent;
