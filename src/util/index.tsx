export const formatAddress = (address: string): string =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const balanceFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 2,
  useGrouping: false,
});

export const WRAPPER_CLASSES = 'max-w-6xl justify-between p-4 md:py-6 md:px-8';
