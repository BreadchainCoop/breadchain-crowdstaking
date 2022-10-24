export const removeLeadingZeros = (inputValue: string): string =>
  // ^ :: match beginning of string
  // 0 :: match "0" character"
  // + :: match one or more of the preceding character
  inputValue.replace(/^0+/, '');
export const removeNonNumericCharacters = (inputValue: string): string => inputValue
  .split('')
  .filter((i) => i.match(/^[0-9]*[.]?[0-9]*$/))
  .join('');

/**
 * Remove any non numeric values and leading zeros
 * @param inputValue
 * @returns string
 */
export const sanitizeInputValue = (inputValue: string): string => removeNonNumericCharacters(removeLeadingZeros(inputValue));
