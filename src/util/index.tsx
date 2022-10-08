export const classNames = (...classes: String[]) => {
  return classes.filter(Boolean).join(" ");
};

export const formatAddress = (address: string): string => {
  return address.slice(0, 5) + "..." + address.slice(address.length - 4);
};
