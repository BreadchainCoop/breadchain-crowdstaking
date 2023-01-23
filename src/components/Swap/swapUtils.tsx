// ^ :: match beginning of string
// 0 :: match "0" character"
// + :: match one or more of the preceding character
export const removeLeadingZeros = (inputValue: string): string =>
  inputValue.replace(/^0+/, '');

export const removeNonNumericCharacters = (inputValue: string): string =>
  inputValue
    .split('')
    .filter((i) => i.match(/^[0-9]*[.]?[0-9]*$/))
    .join('');

export const sanitizeInputValue = (inputValue: string) => {
  const zerosRemoved = removeLeadingZeros(inputValue);
  return removeNonNumericCharacters(zerosRemoved);
};
