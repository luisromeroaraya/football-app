import { GetServerSideProps, NextPage } from "next";
import { ISession, ISessionUser, IUser } from "../../comps/types";

import EditProfile from "../../comps/pages/players/EditProfile";
import Head from "next/head";
import PlayerHeader from "../../comps/pages/players/PlayerHeader";
import PlayerStats from "../../comps/pages/players/PlayerStats";
import axios from "axios";
import { getSession } from "next-auth/react";
import useSecurePage from "../../comps/hooks/useSecurePage";
import { useState } from "react";

interface Props {
  user: IUser;
  isUserSessionProfile: boolean;
}

const Profile: NextPage<Props> = ({ user, isUserSessionProfile }) => {
  const [editMode, setEditMode] = useState(false);
  const { username, profile } = user;
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
          user={user}
          setEditMode={setEditMode}
          isUserSessionProfile={isUserSessionProfile}
        />
        <PlayerStats goals={goals} matches={matches} fans={fans?.length} />
      </div>
      {isUserSessionProfile && (
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

  const { data: user } = await axios.get<IUser>(
    `https://football-app-back-end.herokuapp.com/api/user/profile/${username}`,
    {
      headers: {
        Authorization: `Bearer ${sessionUser.token}`,
      },
    },
  );
  return {
    props: {
      user,
      isUserSessionProfile:
        (session?.user as ISessionUser).sub === user.username,
    },
  };
};

export default Profile;
