import React from "react";
import { useParams } from "react-router-dom";
import Peer from "peerjs";
function Gameplay({ peer, remotePeerId, setPeer, setPeerId }) {
  const { gameID } = useParams();
  return (
    <div>
      <p>GAME STARTED with {gameID}</p>
    </div>
  );
}

export default Gameplay;
