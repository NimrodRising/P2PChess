import ChessBoard from "./components/ChessBoard";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
const initialGameStatus = {
  inProgress: false,
  winner: null,
  isCheckmate: false,
  isStalemate: false,
};
function App() {
  const [gameStatus, setGameStatus] = useState(initialGameStatus);
  const [peer, setPeer] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState(null);
  const [peerId, setPeerId] = useState(null);
  const [isConnector, setIsConnector] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (peer) {
      peer.on("open", (id) => {
        console.log("working");
        setPeerId(id);
      });

      peer.on("connection", (conn) => {
        setIsConnected(true);
        console.log(conn.peer);
        conn.on("data", (data) => {
          console.log(data);
          conn.send(`hello from ${peerId}`);
        });
      });
      if (remotePeerId && !isConnected) {
        if (isConnector) {
          let conn = peer.connect(remotePeerId);
          conn.on("open", () => {
            setIsConnected(true);
            console.log("connector has formed connection");
            conn.send("hello, origin!");
            conn.on("data", (data) => {
              console.log(data);
            });
            navigate(`/game/${conn.peer}`);
          });
        }
      }
    }
  }, [peerId, peer, isConnector, navigate, remotePeerId, isConnected]);

  return (
    <div className="font-nunito font-thin px-10 py-10 bg-[#0d1a25] text-white h-screen w-screen">
      <div className="h-[90vh] flex justify-center gap-5 h-full">
        <ChessBoard />
        <Sidebar
          gameStatus={gameStatus}
          setPeer={setPeer}
          peer={peer}
          peerId={peerId}
          setIsConnector={setIsConnector}
          remotePeerId={remotePeerId}
          setRemotePeerId={setRemotePeerId}
        />
      </div>
    </div>
  );
}

export default App;
