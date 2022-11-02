import { Dispatch, FC, SetStateAction } from "react";
import { faEdit, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "../../types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  user: IUser;
  isUserSessionProfile: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

const PlayerHeader: FC<Props> = ({
  user,
  setEditMode,
  isUserSessionProfile,
}) => {
  const { username, profile, teams, mainTeam } = user;
  const { country, bio, displayName, number, userPic, position } = profile;

  return (
    <header className="relative flex flex-col items-center">
      <div
        className="absolute h-40 w-40 -translate-y-1/2 rounded-full border-2 border-white bg-gray-800 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${userPic})` }}
      ></div>
      <div className="flex h-20 w-full justify-between pt-4 text-xl">
        <div>
          {!isUserSessionProfile && <FontAwesomeIcon icon={faUserPlus} />}
        </div>
        {isUserSessionProfile && (
          <FontAwesomeIcon icon={faEdit} onClick={() => setEditMode(true)} />
        )}
      </div>
      <span className="mt-4 text-gray-700">@{username}</span>
      <div className="flex w-full items-center justify-center text-3xl">
        {country && (
          <Image
            src={`https://www.countryflagicons.com/FLAT/32/${country.toUpperCase()}.png`}
            alt="country flag"
            width={32}
            height={32}
          />
        )}
        <h2 className="ml-2 font-bold capitalize leading-none">
          {displayName}
        </h2>
        {number && (
          <span className="ml-2 font-bold leading-none">{number}</span>
        )}
      </div>
      {position && (
        <span className="mt-3 text-xl capitalize text-gray-700">
          {position}
        </span>
      )}
      {/* // TODO: find icon for position */}
      {mainTeam && (
        <Link href={`/teams/${mainTeam?.id}`}>
          <a className="mt-3 flex w-full items-center justify-center text-sm capitalize text-gray-500">
            <div
              className="h-5 w-5 rounded-full bg-gray-800 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${mainTeam.logo})` }}
            ></div>
            <span className="ml-2">{mainTeam?.name}</span>
          </a>
        </Link>
      )}
      {bio && <p className="mt-3 text-center text-gray-700">{bio}</p>}
    </header>
  );
};

export default PlayerHeader;
