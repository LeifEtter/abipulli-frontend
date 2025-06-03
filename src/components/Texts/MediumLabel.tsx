interface MediumLabelParams {
  text: string;
}

export const MediumLabel: React.FC<MediumLabelParams> = ({ text }) => (
  <h2 className="text-xl font-semibold text-ap-new-black mb-2">{text}</h2>
);
