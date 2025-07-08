export const convertToDateValue = (date: Date): string => {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  if (month.length < 2) month = `0${month}`;
  let day = date.getDate().toString();
  if (day.length < 2) day = `0${day}`;
  return `${year}-${month}-${day}`;
};
