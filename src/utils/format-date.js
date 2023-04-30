export const simpleDate = (inputDate) => {
  const dateObj = new Date(inputDate);
  const newDate = `${String(dateObj.getDate()).padStart(2, "0")}-${String(
    dateObj.getMonth() + 1
  ).padStart(2, "0")}-${dateObj.getFullYear()}`;
  return newDate;
};
