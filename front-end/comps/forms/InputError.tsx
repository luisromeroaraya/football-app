import { FC } from "react";

interface Props {
  errorText?: string;
}

const InputError: FC<Props> = ({ errorText }) => (
  <>
    {errorText && (
      <div className="relative">
        <span className="absolute text-xs bg-white text-red-500 p-1 rounded shadow z-50 mt-1">{errorText}</span>
      </div>
    )}
  </>
);

export default InputError;
