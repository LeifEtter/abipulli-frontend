interface SuperDuperShinySpecialButtonProps {
  onClick: () => void;
  text: string;
}

export const SuperDuperShinySpecialButton = ({
  onClick,
  text,
}: SuperDuperShinySpecialButtonProps) => (
  <button
    onClick={onClick}
    className="relative before:absolute py-2 px-3 text-white font-medium rounded-md hover:shadow-md hover:scale-105 cursor-pointer bg-linear-to-r from-ap-gradient-blue to-ap-gradient-red   dark:hover:bg-slate-100 focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50  before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
  >
    {text}
  </button>
);
