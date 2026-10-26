const euro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export const formatAmount = (amount: number) => euro.format(amount);
