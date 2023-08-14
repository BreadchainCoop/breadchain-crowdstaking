export const sanitizeInputValue = (inputValue: string) => {
  let hasPeriod = false;
  return inputValue
    .split('')
    .filter((i) => {
      if (!i.match(/^[0-9]*[.]?[0-9]*$/)) return false;
      // only allow first period we find
      if (i === '.') {
        if (hasPeriod) return false;
        hasPeriod = true;
      }
      return true;
    })
    .join('');
};

export default {};
