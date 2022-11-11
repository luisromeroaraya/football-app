import { ChangeEventHandler, FC } from "react";

import InputError from "./InputError";

interface Props {
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  id: string;
  name: string;
  labelName: string;
  labelClassName?: string;
  className?: string;
  selectClassName?: string;
  autoFocus?: boolean;
  isRequired?: boolean;
  defaultValueText?: string;
  options: JSX.Element[];
  errorText?: string;
}

const SelectField: FC<Props> = ({
  value,
  onChange,
  id,
  labelName,
  labelClassName = "block text-sm font-bold mb-2 text-gray-700",
  name,
  autoFocus,
  className = "mt-8 flex w-full flex-col justify-center",
  selectClassName = "border-gray-300 text-sm rounded py-2 px-3 text-gray-700 leading-tight no-change w-full",
  defaultValueText = "Select an option",
  isRequired,
  options,
  errorText,
}) => (
  <div className={className}>
    <label className={labelClassName} htmlFor={id}>
      {labelName} {isRequired && "*"}
    </label>
    <select
      className={selectClassName}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
    >
      <option value="">{defaultValueText}</option>
      {options}
    </select>
    <InputError errorText={errorText} />
  </div>
);

export default SelectField;
