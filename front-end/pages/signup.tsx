import { FC, useState } from "react";
import {
  faCircleExclamation,
  faEnvelope,
  faKey
} from "@fortawesome/free-solid-svg-icons";

import CustomForm from "../comps/forms/CustomForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import InputField from "../comps/forms/InputField";
import Link from "next/link";
import Spinner from "../comps/ui/Spinner";
import axios from "axios";
import { signIn } from "next-auth/react";
import useAlreadyAuthenticated from "../comps/hooks/useAlreadyAuthenticated";

const SignUp: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useAlreadyAuthenticated();

  const onSubmit = async (data: { username: string; password: string }) => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://football-app-back-end.herokuapp.com/api/user/register/",
        data,
      );
      if (res.status === 200) return signIn("credentials", data);
    } catch (err) {
      setIsLoading(false);
      if (axios.isAxiosError(err)) setError(err.toString());
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - Pichanga</title>
        <meta name="description" content="Sign up to your account" />
      </Head>
      <div className="flex h-full w-screen flex-col items-center  text-white">
        <h1 className="mt-8 w-[calc(100%-2rem)] text-center text-4xl font-bold">
          Organize your football games with Pichanga.
        </h1>
        <div className="mt-8 flex w-[calc(100%-2rem)] flex-col">
          <CustomForm<{ username: string; password: string }>
            onSubmit={onSubmit}
            className="flex flex-col items-center"
          >
            <InputField
              name="username"
              placeholder="Username"
              type="text"
              icon={faEnvelope}
            />
            <InputField
              name="password"
              placeholder="Password"
              icon={faKey}
              type="password"
            />
            <div className="mt-4 flex h-4 items-center justify-center text-red-700">
              {isLoading && <Spinner />}
              {error && (
                <p>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="mr-1"
                  />
                  {error}
                </p>
              )}
            </div>
            <button className="mt-8 rounded bg-white px-4 py-2 text-xl  font-bold uppercase text-gray-800 ">
              Sign Up
            </button>
            <p className="mt-4">
              Already have an account?
              <Link href="/login">
                <a className="text-blue-900"> Log In</a>
              </Link>
            </p>
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default SignUp;
