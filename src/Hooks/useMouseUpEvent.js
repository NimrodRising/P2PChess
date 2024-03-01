import { useEffect, useState } from "react";

const useMouseUpEvent = (bool) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    function setFromEvent(event) {
      setEvent(event);
    }
    bool && window.addEventListener("mouseup", setFromEvent);
    return () => {
      bool && window.removeEventListener("mouseup", setFromEvent);
    };
  }, [bool, event]);
  return event;
};

export default useMouseUpEvent;
