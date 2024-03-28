import ChessBoard from "./components/ChessBoard";
import { useState, useRef } from "react";
import Peer from "peerjs";
function App() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const peerInstance = useRef(null);
  return (
    <div className="flex justify-center items-center h-screen">
      <ChessBoard />
    </div>
  );
}

export default App;
