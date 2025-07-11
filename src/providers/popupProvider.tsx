import { useCallback, useState } from "react";
import { ReactNode } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Popup, PopupContext } from "./popupContext";
import { Center } from "src/components/Misc/Center";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { SmallLabel } from "src/components/Texts/SmallLabel";

// Add animation later
export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [popup, setPopup] = useState<Popup | null>(null);

  const showPopup = useCallback(
    ({ message, description, onClickConfirm }: Popup) => {
      setPopup({ message, description, onClickConfirm });
    },
    []
  );

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {popup != null ? (
        <div
          onClick={() => setPopup(null)}
          className="absolute bg-black/10 z-100 w-full h-full top-0 left-0 flex flex-col items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="card opacity-100"
          >
            <SmallLabel text={popup.message} />
            <div className="flex flex-row gap-4 mt-8">
              <BasicButton onClick={popup.onClickConfirm}>
                Bestätigen
              </BasicButton>
              <BasicButton color="bg-red-300" onClick={() => setPopup(null)}>
                Abbrechen
              </BasicButton>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </PopupContext.Provider>
  );
};
