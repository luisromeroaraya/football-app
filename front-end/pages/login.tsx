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
import { signIn } from "next-auth/react";
import useAlreadyAuthenticated from "../comps/hooks/useAlreadyAuthenticated";
import { useRouter } from "next/router";

const Login: FC = () => {
  const router = useRouter();
  const { signout } = router.query;
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = async (data: { username: string; password: string }) => {
    setError("");
    setIsLoading(true);
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.status === 200) return router.push("/");
    setIsLoading(false);
    setError("Invalid username or password.");
  };
  useAlreadyAuthenticated();
  return (
    <>
      <Head>
        <title>Login - Pichanga</title>
        <meta name="description" content="Login to your account" />
      </Head>
      <div className="flex h-full w-screen flex-col items-center  text-white">
        <h1 className="mt-8 w-[calc(100%-2rem)] text-center text-4xl font-bold">
          {signout ? <p>See you next time!</p> : "Welcome back!"}
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
            <button className="mt-8 rounded bg-gray-100 px-4 py-2 text-xl  font-bold uppercase text-gray-800 ">
              Login
            </button>
            <p className="mt-4">
              Don&apos;t have an account?
              <Link href="/signup">
                <a className="text-blue-900"> Sign Up</a>
              </Link>
            </p>
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default Login;
