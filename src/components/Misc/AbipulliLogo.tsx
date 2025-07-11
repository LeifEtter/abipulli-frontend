import AbiPulli from "src/assets/icons/abipulli-logo.png";

export const AbiPulliLogo: React.FC = () => (
  <span className="flex flex-row gap-2 justify-center items-center self-start pt-5 pl-5">
    <img src={AbiPulli} className="w-8 h-8" />
    <h2 className="text-xl font-semibold">Abipulli.com</h2>
  </span>
);
