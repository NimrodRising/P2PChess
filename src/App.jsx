import ChessBoard from "./components/ChessBoard";
import { useEffect, useState } from "react";

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({});
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <ChessBoard
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        mousePos={mousePos}
      />
    </div>
  );
}

export default App;
