import React from "react";
import { useState, useEffect } from "react";
import copyIcon from "./images/copyIcon.svg";
import Peer from "peerjs";
function CreateGame({ setPeer, peer, peerId }) {
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [animation, setAnimation] = useState("");

  function handleClick() {
    const peer = new Peer({
      host: "localhost",
      port: 9000,
      path: "/myapp",
    });
    setPeer(peer);
  }

  const link = `localhost:5173/play/${peerId}`;
  return (
    <div className="h-full relative w-full flex flex-col items-center justify-center border border-gray-600 border-x-0 border-t-0">
      {peerId ? (
        <div className="flex flex-col">
          <aside className="font-bold">Share this link with a friend!</aside>
          <div className="flex items-center justify-center gap-0 w-full h-10">
            <input
              readOnly
              className="focus:outline-none p-1 rounded-sm bg-[rgba(1,1,1,0.15)]"
              spellCheck={false}
              value={`localhost:5173/play/${peerId}`}
            />
            <button
              onClick={async () => {
                if (isCopied) {
                  return;
                } else {
                  await navigator.clipboard.writeText(link);
                  if (!isCopied) {
                    setAnimation("animate-fade");
                  }
                  setIsCopied(true);
                  setTimeout(() => {
                    setIsCopied(false);
                    setAnimation("");
                  }, 1500);
                }
              }}
              className="w-8 opacity-50 bg-[rgba(1,1,1,0.50)] "
            >
              <img src={copyIcon} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="bg-[#294f6f] p-3 rounded-lg shadow"
        >
          <aside>Create Game</aside>
        </button>
      )}
      <aside
        className={`${animation} opacity-0 absolute bottom-1/4 p-1 rounded-md text-sm`}
      >
        Copied to clipboard!
      </aside>
    </div>
  );
}

export default CreateGame;
