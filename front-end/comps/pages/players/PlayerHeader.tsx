import { Dispatch, FC, SetStateAction } from "react";
import { ISessionUser, IUser } from "../../types";
import { faEdit, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const sessionUser = session?.user as ISessionUser;
  const { username, profile } = user;
  const { country, bio, display_name, number, picture, position, teams } =
    profile;

  const officialTeam = teams.find((team) => team.is_official);

  return (
    <header className="relative flex flex-col items-center">
      <div
        className="absolute h-40 w-40 -translate-y-1/2 rounded-full border-2 border-white bg-gray-800 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${picture})` }}
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
          <img
            src={`https://www.countryflagicons.com/FLAT/32/${country.toUpperCase()}.png`}
          />
        )}
        <h2 className="ml-2 font-bold capitalize leading-none">
          {display_name}
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
      {officialTeam && (
        <Link href={`/teams/${officialTeam?.id}`}>
          <a className="mt-3 flex w-full items-center justify-center text-sm capitalize text-gray-500">
            <div
              className="h-5 w-5 rounded-full bg-gray-800 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${officialTeam.logo})` }}
            ></div>
            <span className="ml-2">{officialTeam?.name}</span>
          </a>
        </Link>
      )}
      {bio && <p className="mt-3 text-center text-gray-700">{bio}</p>}
    </header>
  );
};

export default PlayerHeader;
