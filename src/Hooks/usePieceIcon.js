import { useEffect, useState } from "react";

export const usePieceIcon = (piece) => {
  const [pieceIcon, setPieceIcon] = useState({ x: 0, y: 0 });
  useEffect(() => {
    async function getIcon() {
      let importedIcon = await import(`../icons/${piece}.svg`).catch(() => {
        setPieceIcon("");
        return;
      });

      if (importedIcon) {
        setPieceIcon(importedIcon.default);
      } else {
        setPieceIcon("");
      }
    }
    getIcon();
  }, [piece]);

  return pieceIcon;
};

export default usePieceIcon;
