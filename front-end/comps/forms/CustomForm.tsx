import {
  ChangeEvent,
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
  useState
} from "react";

interface Props<T> {
  children: ReactNode;
  onSubmit: (data: T) => void;
  className?: string;
}
type IFormState = Record<
  string,
  {
    value: string;
    errorText: string;
    checkValidation: (value: string) => string;
    isRequired: boolean;
  }
>;

const initialiseInputStates = (children: ReactNode): IFormState =>
  Children.toArray(children).reduce((acc, child) => {
    if (!isValidElement(child) || !child.props.name) return acc;
    if (child.props.children && child.props.name === "container")
      return { ...acc, ...initialiseInputStates(child.props.children) };
    return {
      ...acc,
      [child.props.name]: {
        value: child.props.initialValue || "",
        errorText: "",
        checkValidation: child.props.checkValidation,
        isRequired: child.props.isRequired,
      },
    };
  }, {});

const cloneChildren = (
  children: ReactNode,
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void,
  formState: IFormState,
): ReactNode =>
  Children.toArray(children).reduce((acc: ReactNode[], child) => {
    if (!isValidElement(child) || !child.props.name) return [...acc, child];
    if (child.props.children && child.props.name === "container")
      return [
        ...acc,
        cloneElement(child, {
          ...child.props,
          children: cloneChildren(
            child.props.children,
            handleChange,
            formState,
          ),
        }),
      ];
    return [
      ...acc,
      cloneElement(child, {
        ...child.props,
        value: formState[child.props.name].value,
        onChange: handleChange,
        errorText: formState[child.props.name].errorText,
      }),
    ];
  }, []);

const CustomForm = <T,>({ children, onSubmit, className }: Props<T>) => {
  const [formState, setFormState] = useState<IFormState>(
    initialiseInputStates(children),
  );
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) =>
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name],
        value: e.target.value,
        errorText: e.target.value
          ? formState[e.target.name].checkValidation?.(e.target.value)
          : "",
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
    setFormState(
      formStateKeys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: { ...formState[key], errorText: "", value: "" },
        }),
        {},
      ),
    );
    const data = formStateKeys.reduce(
      (acc, key) => ({ ...acc, [key]: formState[key].value }),
      {},
    );
    onSubmit(data as T);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {cloneChildren(children, handleChange, formState)}
    </form>
  );
};

export default CustomForm;
