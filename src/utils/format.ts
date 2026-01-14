export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const newFormat = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return newFormat;
};
