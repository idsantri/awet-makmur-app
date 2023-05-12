export const simpleDate = (inputDate) => {
  const dateObj = new Date(inputDate);
  const newDate = `${String(dateObj.getDate()).padStart(2, "0")}-${String(
    dateObj.getMonth() + 1
  ).padStart(2, "0")}-${dateObj.getFullYear()}`;
  return newDate;
};

const stringMonth = (month) => {
  let sMonth;
  switch (Number(month)) {
    case 1:
      sMonth = "Januari";
      break;
    case 2:
      sMonth = "Februari";
      break;
    case 3:
      sMonth = "Maret";
      break;
    case 4:
      sMonth = "April";
      break;
    case 5:
      sMonth = "Mei";
      break;
    case 6:
      sMonth = "Juni";
      break;
    case 7:
      sMonth = "Juli";
      break;
    case 8:
      sMonth = "Agustus";
      break;
    case 9:
      sMonth = "September";
      break;
    case 10:
      sMonth = "Oktober";
      break;
    case 11:
      sMonth = "November";
      break;
    case 12:
      sMonth = "Desember";
      break;
    default:
      "x";
      break;
  }
  return sMonth;
};
export const fullDate = (inputDate) => {
  const dateObj = new Date(inputDate);
  const months = String(dateObj.getMonth() + 1).padStart(2, "0");
  const month = stringMonth(months);
  const newDate = `${String(dateObj.getDate()).padStart(
    2,
    "0"
  )} ${month} ${dateObj.getFullYear()}`;
  return newDate;
};
