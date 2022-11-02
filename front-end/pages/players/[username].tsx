import { GetServerSideProps, NextPage } from "next";
import { ISessionUser, IUser } from "../../comps/types";

import EditProfile from "../../comps/pages/players/EditProfile";
import Head from "next/head";
import PlayerHeader from "../../comps/pages/players/PlayerHeader";
import PlayerStats from "../../comps/pages/players/PlayerStats";
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
        <PlayerStats goals={goals} matches={matches} fans={fans.length} />
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
  // const { user } = session as unknown as ISession; // TODO: fix this
  // const { data } = await axios.get(
  //   `https://football-app-back-end.herokuapp.com/api/user/${session?.user?.id}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${session?.user.token}`,
  //     },
  //   },
  // );
  const user: IUser = {
    id: 1,
    email: "user@user.com",
    username: "user",
    profile: {
      id: 1,
      goals: 10,
      matches: 10,
      fans: [],
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed",
      country: "br",
      display_name: "Userinho",
      number: 10,
      position: "midfielder",
      picture:
        "https://estaticos-cdn.sport.es/clip/ae1f1131-ae9d-490d-999b-1e702bf4c109_alta-libre-aspect-ratio_default_0.jpg",
      teams: [
        {
          id: 1,
          logo: "https://wallpaperaccess.com/full/777518.jpg",
          name: "barcelona",
          is_official: true,
        },
      ],
    },
  };
  return {
    props: {
      user,
      isUserSessionProfile:
        (session?.user as ISessionUser).sub === user.username,
    },
  };
};

export default Profile;
