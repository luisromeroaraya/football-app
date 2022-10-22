import React, { ChangeEvent, Children, FC, ReactNode, cloneElement, isValidElement, useState } from "react";
import { IDataForm, IFormState } from "./types";

interface Props {
  children: ReactNode;
  onSubmit: (data: IDataForm) => void;
  className?: string;
}

const initialiseInputStates = (children: ReactNode) =>
  Children.toArray(children).reduce(
    (acc, child) =>
      isValidElement(child) && child.props.name
        ? {
            ...acc,
            [child.props.name]: {
              value: "",
              errorText: "",
              checkValidation: child.props.checkValidation,
              isRequired: child.props.isRequired,
            },
          }
        : acc,
    {}
  );

const CustomForm: FC<Props> = ({ children, onSubmit, className }) => {
  const initialState = initialiseInputStates(children);
  const [formState, setFormState] = useState<IFormState>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name],
        value: e.target.value,
        errorText: e.target.value ? formState[e.target.name].checkValidation?.(e.target.value) : "",
      },
    }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formStateKeys = Object.keys(formState);
    const error = formStateKeys.reduce((acc, key) => {
      if (formState[key].errorText) return true;
      if (!formState[key].value && formState[key].isRequired) {
        setFormState((prev) => ({
          ...prev,
          [key]: { ...prev[key], errorText: "This field is required" },
        }));
        return true;
      }
      return acc;
    }, false);
    if (error) return;
    setFormState(initialState);
    const data = formStateKeys.reduce((acc, key) => ({ ...acc, [key]: formState[key].value }), {});
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {Children.map(children, (child) =>
        isValidElement(child) && child.type !== "button" && child.type !== "div"
          ? cloneElement(child, {
              ...child.props,
              onChange: handleChange,
              value: formState[child.props.name]?.value,
              errorText: formState[child.props.name]?.errorText,
            })
          : child
      )}
    </form>
  );
};

export default CustomForm;
