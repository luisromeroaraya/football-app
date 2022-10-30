import useDidMountEffect from "./useDidMountEffect";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const useAlreadyAuthenticated = () => {
  const { status } = useSession();
  const router = useRouter();
  useDidMountEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]);
};

export default useAlreadyAuthenticated;
