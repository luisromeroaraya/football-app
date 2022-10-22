export type IDataForm = Record<string, unknown>;

export type IFormState = Record<
  string,
  { value: string; errorText: string; checkValidation: (value: string) => string; isRequired: boolean }
>;
