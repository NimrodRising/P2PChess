import React from "react";
import sendIcon from "./images/sendIcon.svg";

function Chat() {
  return (
    <div className="h-[100%] flex flex-col justify-between w-full bg-[#1B354A] shadow-[3px_3px_15px_0px_rgba(1,1,1,0.20)_inset]">
      <div className="h-full">{/* Messages will go here */}</div>
      <div className="w-full flex">
        <input className="p-1 text-gray-400 text-sm w-full bg-[rgba(1,1,1,0.25)] shadow-lg z-[999] focus:outline-none rounded-bl-sm" />
        <button className="flex items-center bg-[rgba(1,1,1,0.25)] rounded-br-sm">
          <img className="w-5 h-full pr-1" src={sendIcon} />
        </button>
      </div>
    </div>
  );
}

export default Chat;
