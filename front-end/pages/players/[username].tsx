import { GetServerSideProps, NextPage } from "next";
import { ISession, ISessionUser, IUser } from "../../comps/types";
import { getSession, useSession } from "next-auth/react";

import EditProfile from "../../comps/pages/players/EditProfile";
import Head from "next/head";
import PlayerHeader from "../../comps/pages/players/PlayerHeader";
import PlayerStats from "../../comps/pages/players/PlayerStats";
import axios from "axios";
import { useGetData } from "../../comps/hooks/queries/apiHooks";
import useSecurePage from "../../comps/hooks/useSecurePage";
import { useState } from "react";

interface Props {
  initialUserData: IUser;
  isUserSessionProfile: boolean;
}

const getUrl = (username: string) =>
  `https://football-app-back-end.herokuapp.com/api/user/profile/${username}`;

const Profile: NextPage<Props> = ({
  initialUserData,
  isUserSessionProfile,
}) => {
  const { token } = (useSession().data?.user as ISessionUser) || {};
  const [editMode, setEditMode] = useState(false);
  const { data: user } = useGetData({
    url: getUrl(initialUserData.username),
    query: ["user", initialUserData.id],
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    options: {
      initialData: initialUserData,
      staleTime: 2000,
    },
  });
  const { username, profile } = user as IUser;
  const { goals, matches, fans } = profile;
  useSecurePage();
  return (
    <>
      <Head key="head">
        <title>
          <>{username} - Pichanga</>
        </title>
        <meta name="description" content={`${username}'s profile`} />
        <meta property="og:title" content={`${username}'s profile`} />
      </Head>
      <div className="mt-24 flex h-full flex-col rounded-t bg-white px-4 text-black">
        <PlayerHeader
          user={user as IUser}
          setEditMode={setEditMode}
          isUserSessionProfile={isUserSessionProfile}
        />
        <PlayerStats goals={goals} matches={matches} fans={fans?.length} />
      </div>
      {isUserSessionProfile && user && (
        <EditProfile
          user={user}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { user: sessionUser } = session as unknown as ISession; // TODO: fix this
  if (!sessionUser)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  const { username } = context.params as { username: string };

  const { data: initialUserData } = await axios.get<IUser>(getUrl(username), {
    headers: {
      Authorization: `Bearer ${sessionUser.token}`,
    },
  });
  return {
    props: {
      initialUserData,
      isUserSessionProfile:
        (session?.user as ISessionUser).sub === initialUserData.username,
    },
  };
};

export default Profile;
