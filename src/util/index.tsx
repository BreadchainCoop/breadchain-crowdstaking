export const classNames = (...classes: String[]) => classes.filter(Boolean).join(' ');

export const formatAddress = (address: string): string => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
