import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Peer from "peerjs";
function Connecting({ peer, setPeer, setRemotePeerId, setIsConnector }) {
  const { urlPeerId } = useParams();
  useEffect(() => {
    if (!peer) {
      setPeer(() => {
        const peer = new Peer({
          host: "localhost",
          port: 9000,
          path: "/myapp",
        });
        return peer;
      });
      setIsConnector(true);
      console.log(`url's peer id is ${urlPeerId}`);
      setRemotePeerId(urlPeerId);
    }
  }, [setPeer, setIsConnector, urlPeerId, setRemotePeerId, peer]);

  return (
    <div>
      <h1>Connecting...</h1>
    </div>
  );
}

export default Connecting;
