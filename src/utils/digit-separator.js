const digitSeparator = (value) => {
  let n;
  if (!isNaN(value)) n = value;
  else n = 0;
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export default digitSeparator;
