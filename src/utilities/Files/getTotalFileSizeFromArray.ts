export const getTotalFileSizeFromArray = (files: File[]): number => {
  const initialValue: number = 0;
  const totalSize: number = files.reduce(
    (accumulator, currentFile: File) => accumulator + currentFile.size,
    initialValue
  );
  return totalSize;
};
