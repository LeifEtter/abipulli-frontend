export const ModalBackground = ({
  darkenIntensity = 0.2,
}: {
  darkenIntensity: number;
}) => (
  <div
    className="bg-gray-600 fixed w-full h-full z-10"
    style={{ backgroundColor: `rgba(0,0,0,${darkenIntensity})` }}
  />
);
