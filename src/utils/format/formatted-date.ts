export const formattedDate = (inputDate?: string) => {
  const date = inputDate ? new Date(inputDate).getDate() : new Date().getDate();
  const month = inputDate
    ? new Date(inputDate).getMonth() + 1
    : new Date().getMonth();
  const year = inputDate
    ? new Date(inputDate).getFullYear()
    : new Date().getFullYear();

  return `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(
    2,
    "0"
  )}`;
};
