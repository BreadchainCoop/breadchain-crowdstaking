export const classNames = (...classes: String[]) => classes.filter(Boolean).join(' ');

export const formatAddress = (address: string): string => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const balanceFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  useGrouping: false,
});
