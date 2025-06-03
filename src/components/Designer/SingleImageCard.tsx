interface SingleImageCardParams {
  image: string;
}

export const SingleImageCard: React.FC<SingleImageCardParams> = () => (
  <div className="border-2 rounded-md border-ap-new-gray aspect-square w-full h-full"></div>
);
