interface ToolButtonProps {
  iconSource: string;
  label: string;
  onClick: () => void;
}

export const ToolButton = ({ iconSource, label, onClick }: ToolButtonProps) => (
  <div className="flex flex-row items-center border-abipulli-darker-beige border rounded-lg hover:scale-105 hover:bg-gray-800 hover:text-white duration-125 hover:border-black cursor-pointer ">
    <img
      src={iconSource}
      className="border-r border-abipulli-darker-beige p-2"
    />
    <p className="py-1 px-2 font-medium">{label}</p>
  </div>
);
