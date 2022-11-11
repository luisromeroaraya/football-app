import { ChangeEventHandler, forwardRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import InputError from "./InputError";

interface Props {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  id: string | number;
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
  icon?: IconProp;
  initialValue?: string;
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
      className = "mt-8 flex w-full flex-col justify-center",
      type = "text",
      autoFocus,
      readOnly,
      inputClassName = "rounded border border-white py-3 px-12 text-white leading-tight no-change w-full bg-green-500 text-white placeholder-gray-200",
      readOnlyClassName,
      placeholder = labelName,
      required,
      disabled,
      min,
      max,
      isRequired,
      errorText,
      icon,
    },
    ref,
  ) => (
    <div className={className}>
      {labelName && (
        <label className={labelClassName} htmlFor={id?.toString()}>
          {labelName} {isRequired && "*"}
        </label>
      )}
      {icon && (
        <FontAwesomeIcon icon={icon} className="absolute z-10 ml-4 text-xl" />
      )}
      <input
        ref={ref}
        className={`${inputClassName} ${
          !readOnly
            ? "focus:shadow-outline focus:outline-none"
            : readOnlyClassName
        }`}
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
  ),
);

InputField.displayName = "InputField";

export default InputField;
