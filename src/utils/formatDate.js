export const formatDate = (value) => {
  const date = new Date(value).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return date;
};
