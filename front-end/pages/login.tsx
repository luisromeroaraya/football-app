import { Dispatch, FC, SetStateAction } from "react";
import { IJWTresponse, IUser } from "../comps/types";

import CustomForm from "../comps/forms/CustomForm";
import InputField from "../comps/forms/InputField";
import Link from "next/link";
import axios from "axios";
import { usePostData } from "../comps/hooks/queries/apiHooks";

interface Props {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

const Login: FC<Props> = ({ setIsLogged }) => {
  const { mutate: login } = usePostData<IUser, IJWTresponse>({
    url: "https://football-app-back-end.herokuapp.com/api/user/login/",
    queries: [["current_user"]],
    onSuccess: (res) => sessionStorage.setItem("jwtToken", res.token),
  });

  return (
    <div className="flex h-full w-screen flex-col items-center  text-white">
      <h1 className="mt-8 w-[calc(100%-2rem)] text-center text-4xl font-bold">
        Organize your football games with Pichanga.
      </h1>
      <div className="mt-8 flex w-[calc(100%-2rem)]  flex-col">
        <CustomForm<IJWTresponse>
          onSubmit={login}
          className="flex flex-col items-center"
        >
          <InputField
            name="username"
            labelClassName="block font-bold mb-2 text-gray-200"
            labelName="E-mail"
            type="text"
            className="mt-8 flex w-full flex-col"
            inputClassName="rounded border border-white py-3 px-6 text-gray-700 leading-tight no-change w-full bg-green-500 text-white"
          />
          <InputField
            name="password"
            labelClassName="block font-bold mb-2 text-gray-200"
            labelName="Password"
            type="password"
            className="mt-8 flex w-full flex-col"
            inputClassName="rounded border border-white  py-3 px-6 text-gray-700 leading-tight no-change w-full bg-green-500 text-white"
          />
          <button className="mt-8 rounded bg-white px-4 py-2 text-xl  font-bold uppercase text-gray-800 ">
            Login
          </button>
          <p className="mt-4">
            Don't have an account?
            <Link href="/register">
              <a className="text-blue-900"> Sign Up</a>
            </Link>
          </p>
        </CustomForm>
      </div>
    </div>
  );
};

export default Login;
