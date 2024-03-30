import React from "react";
import CreateGame from "./CreateGame";
import Chat from "./Chat";
import Gameplay from "./Gameplay";
import Connecting from "./Connecting";
import { Route, Routes } from "react-router-dom";
function Sidebar({
  gameStatus,
  setPeer,
  peer,
  peerId,
  setIsConnector,
  remotePeerId,
  setRemotePeerId,
}) {
  gameStatus;
  return (
    <div className="rounded-sm flex flex-col items-center h-[100%] w-1/4 bg-[#1b354a]">
      <Routes>
        <Route
          path="/"
          element={<CreateGame setPeer={setPeer} peer={peer} peerId={peerId} />}
        ></Route>
        <Route
          path="/game/:peerId"
          element={<Gameplay setPeer={setPeer} peer={peer} />}
        ></Route>
        <Route
          path="/play/:urlPeerId"
          element={
            <Connecting
              setPeer={setPeer}
              setIsConnector={setIsConnector}
              peer={peer}
              peerId={peerId}
              remotePeerId={remotePeerId}
              setRemotePeerId={setRemotePeerId}
            />
          }
        ></Route>
      </Routes>
      <Chat />
    </div>
  );
}

export default Sidebar;
