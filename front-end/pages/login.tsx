import { Dispatch, FC, SetStateAction } from "react";

import CustomForm from "../comps/forms/CustomForm";
import InputField from "../comps/forms/InputField";

interface Props {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

const Login: FC<Props> = ({ setIsLogged }) => (
  <div className="w-screen h-full flex flex-col justify-center items-center text-gray-800">
    <div className="rounded w-[calc(100%-2rem)] flex flex-col p-10 bg-white">
      <h1 className="text-xl font-bold text-center">Login</h1>
      <CustomForm onSubmit={(data) => console.log(data)} className="flex flex-col items-center">
        <InputField
          name="email"
          labelName="E-mail"
          type="email"
          className="flex flex-col mt-4 w-full"
          inputClassName="border-gray-300 text-sm rounded py-2 px-3 text-gray-700 leading-tight no-change w-full border"
        />
        <InputField
          name="password"
          labelName="Password"
          type="password"
          className="flex flex-col mt-4 w-full"
          inputClassName="border-gray-300 text-sm rounded py-2 px-3 text-gray-700 leading-tight no-change w-full border"
        />
        <button className="bg-pichanga text-white rounded mt-4 p-2 ">Login</button>
      </CustomForm>
    </div>
  </div>
);

export default Login;
