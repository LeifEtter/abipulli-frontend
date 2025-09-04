interface ToggleProps {
  isActive: boolean;
  toggleActive: () => void;
}

export const Toggle = ({ isActive, toggleActive }: ToggleProps) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <div
        onClick={() => toggleActive()}
        className={`cursor-pointer relative h-4 w-8 border border-gray-200 rounded-xl flex bg-white duration-75`}
      >
        <div
          className={`absolute rounded-full bg-abipulli-black h-full aspect-square duration-100 ${!isActive ? "left-0 bg-gray-300 " : "left-4 bg-black"}`}
        />
      </div>
      <p className="font-semibold text-md">Show Motto</p>
    </div>
  );
};
