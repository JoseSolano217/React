export const getLocalDate = (date: Date | string) => {
  const listDate = new Date(date);
  return listDate.toLocaleDateString();
};

export const getHour = (date: Date | string) => {
  const listDate = new Date(date);
  return listDate.toLocaleTimeString();
};
