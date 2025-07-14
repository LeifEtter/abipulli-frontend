import { ViewingSide } from "src/types/ViewingSide";

interface FrontBackButtonProps {
  switchViewingSide: (side: ViewingSide) => void;
  currentViewingSide: ViewingSide;
}

export const FrontBackButton = ({
  switchViewingSide,
  currentViewingSide,
}: FrontBackButtonProps) => (
  <div
    className="flex justify-center relative border-black border-2 bg-white rounded-4xl h-14 font-semibold [&>*]:cursor-pointer min-w-60 max-w-70"
    role="group"
    aria-label="Ansicht wechseln"
  >
    <button
      onClick={() => switchViewingSide(ViewingSide.Front)}
      aria-label="Vorderseite anzeigen"
      aria-pressed={currentViewingSide == ViewingSide.Front}
      className={`z-10 w-1/2 text-black pl-2 ${currentViewingSide == ViewingSide.Front && "text-white"}`}
    >
      Vorne
    </button>
    <button
      onClick={() => switchViewingSide(ViewingSide.Back)}
      aria-label="Rückseite anzeigen"
      aria-pressed={currentViewingSide == ViewingSide.Back}
      className={`z-10 w-1/2 pr-2 ${currentViewingSide == ViewingSide.Back && "text-white"}`}
    >
      Hinten
    </button>
    <div
      className={`absolute h-14 rounded-4xl bg-black w-7/12 -top-0.5 ${currentViewingSide == ViewingSide.Front ? " -left-0.5" : "left-5/12"} transition-all duration-100`}
    />
  </div>
);
