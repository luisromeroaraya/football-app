import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import axios from "axios";
import jwt_decode from "jwt-decode";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {},
      authorize: async (credentials) => {
        const res = await axios.post(
          "https://football-app-back-end.herokuapp.com/api/user/login/",
          credentials,
        );
        if (res.status === 200)
          return {
            ...jwt_decode(res.data.token),
            token: res.data.token,
            id: res.data.id,
          };
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => (user ? (user as unknown as JWT) : token),
    session: async ({ session, token }) => ({ ...session, user: token }),
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
