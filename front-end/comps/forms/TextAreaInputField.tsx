import { ChangeEventHandler, FC } from "react";

import InputError from "./InputError";

interface Props {
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  labelName?: string;
  id: string | number;
  name: string;
  errorText?: string;
  placeholder?: string;
  isRequired?: boolean;
  className?: string;
  rows?: number;
  labelClassName?: string;
  textAreaClassName?: string;
  checkValidation?: (value: string) => void;
  initialValue?: string;
}

const TextAreaInputField: FC<Props> = ({
  value,
  onChange,
  labelName,
  name,
  id,
  errorText,
  labelClassName = "block text-sm font-bold mb-2 text-gray-700",
  placeholder,
  isRequired,
  textAreaClassName = "border-gray-300 text-sm rounded py-2 px-3 text-gray-700 leading-tight nochange w-full",
  className = "flex flex-col mt-8",
  rows = 8,
}) => (
  <div className={className}>
    {labelName && (
      <label className={labelClassName} htmlFor={id?.toString()}>
        {labelName} {isRequired && "*"}
      </label>
    )}
    <textarea
      value={value}
      name={name}
      onChange={onChange}
      className={textAreaClassName}
      id={id?.toString()}
      placeholder={placeholder}
      rows={rows}
    />
    <InputError errorText={errorText} />
  </div>
);

export default TextAreaInputField;
