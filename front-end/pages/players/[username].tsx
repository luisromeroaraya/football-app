import React, { useState } from "react";

import Head from "next/head";
import PlayerHeader from "../../comps/pages/players/PlayerHeader";
import PlayerStats from "../../comps/pages/players/PlayerStats";
import { useRouter } from "next/router";
import useSecurePage from "../../comps/hooks/useSecurePage";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { username } = router.query;
  useSecurePage();
  return (
    <>
      <Head key="head">
        <title>- Pichanga</title>
        <meta name="description" content={`${username}'s profile`} />
        <meta property="og:title" content={`${username}'s profile`} />
      </Head>
      <div className="mt-24 flex h-full flex-col rounded-t bg-white px-4 text-black">
        <PlayerHeader
          username={username as string}
          countryCode="cl"
          number={10}
          officialTeam={{ id: 10, logo: null, name: "official team" }}
          position="midfielder"
          setEditMode={setEditMode}
          bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed"
        />
        <PlayerStats />
      </div>
    </>
  );
};

export default Profile;
