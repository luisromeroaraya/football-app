import { ChangeEventHandler, forwardRef } from "react";

import InputError from "./InputError";

interface Props {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  id?: string | number;
  name: string;
  labelName?: string;
  labelClassName?: string;
  className?: string;
  type?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  inputClassName?: string;
  readOnlyClassName?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number | string;
  max?: number | string;
  isRequired?: boolean;
  errorText?: string;
  checkValidation?: (value: string) => void;
}

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      onChange,
      id,
      name,
      labelName,
      labelClassName = "block text-sm font-bold mb-2 text-gray-700",
      className = "flex flex-col",
      type = "text",
      autoFocus,
      readOnly,
      inputClassName = "border-gray-300 text-sm rounded py-2 px-3 text-gray-700 leading-tight no-change w-full",
      readOnlyClassName,
      placeholder,
      required,
      disabled,
      min,
      max,
      isRequired,
      errorText,
    },
    ref
  ) => (
    <div className={className}>
      {labelName && (
        <label className={labelClassName} htmlFor={id?.toString()}>
          {labelName} {isRequired && "*"}
        </label>
      )}
      <input
        ref={ref}
        className={`${inputClassName} ${!readOnly ? "focus:outline-none focus:shadow-outline" : readOnlyClassName}`}
        type={type}
        name={name}
        id={id?.toString()}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        readOnly={readOnly}
      />
      <InputError errorText={errorText} />
    </div>
  )
);

InputField.displayName = "InputField";

export default InputField;
