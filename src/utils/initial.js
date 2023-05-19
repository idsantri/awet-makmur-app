function getInitials(str) {
  const words = str.split(" ");
  const initials = words.map((word) => word.charAt(0).toLowerCase());
  return initials.join("");
}
export default getInitials;
