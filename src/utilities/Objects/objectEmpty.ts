export const objectEmpty = (obj: object): boolean => {
  const values = Object.values(obj);
  for (let v of values) {
    if (v != undefined) {
      return false;
    }
  }
  return true;
};
