import AbiPulli from "src/assets/icons/abipulli-logo.png";

export const AbiPulliLogo: React.FC = () => (
  <div
    className="flex flex-row gap-2 justify-center items-center pt-6 pl-6"
    aria-label="Abipulli Logo und Titel"
  >
    <img
      src={AbiPulli}
      className="w-8 h-8"
      alt="Abipulli Logo"
      aria-label="Abipulli Logo"
    />
    <h2 className="text-xl font-semibold">Abipulli.com</h2>
  </div>
);
