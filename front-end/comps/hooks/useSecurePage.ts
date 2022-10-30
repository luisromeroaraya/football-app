import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const useSecurePage = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status]);
};

export default useSecurePage;
