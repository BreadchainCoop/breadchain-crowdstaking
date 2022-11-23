import { ChangeEvent } from 'react';

type TProps = {
  name: string;
  value: string;
  /* eslint-disable-next-line no-unused-vars */
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ name, value, handleInputChange }: TProps) {
  return (
    <input
      name={name}
      className="bg-breadgray-100 mr-8 text-lg sm:text-2xl truncate text-ellipsis  w-0 flex-auto placeholder-gray-200"
      placeholder="00.00"
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      type="text"
      pattern="^[0-9]*[.]?[0-9]*$"
      minLength={1}
      maxLength={79}
      spellCheck="false"
      onChange={handleInputChange}
      value={value}
    />
  );
}

export default Input;
