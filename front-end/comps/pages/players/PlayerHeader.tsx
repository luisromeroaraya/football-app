import { Dispatch, FC, SetStateAction } from "react";
import { IOfficialTeam, IUser } from "../../types";
import { faEdit, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {
  username: string;
  countryCode?: string;
  name?: string;
  number?: number;
  position?: string;
  officialTeam?: IOfficialTeam;
  bio?: string;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

const PlayerHeader: FC<Props> = ({
  username,
  name = username,
  number,
  position,
  countryCode,
  officialTeam,
  bio,
  setEditMode,
}) => {
  const { data: session } = useSession();
  const user = session?.user as IUser;
  return (
    <header className="flex flex-col items-center">
      <div className="absolute h-40 w-40 -translate-y-1/2 rounded-full border-2 border-white bg-gray-800"></div>
      <div className="flex h-20 w-full justify-between pt-4 text-xl">
        <div>
          {user?.sub !== username && <FontAwesomeIcon icon={faUserPlus} />}
        </div>
        {user?.sub === username && (
          <FontAwesomeIcon icon={faEdit} onClick={() => setEditMode(true)} />
        )}
      </div>
      <span className="mt-4 text-gray-700">@{username}</span>
      <div className="flex w-full items-center justify-center text-3xl">
        {countryCode && (
          <img
            src={`https://www.countryflagicons.com/FLAT/32/${countryCode.toUpperCase()}.png`}
          />
        )}
        <h2 className="ml-2 font-bold capitalize leading-none">{name}</h2>
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
              className="h-5 w-5 rounded-full bg-gray-800"
              style={{ backgroundImage: `url(${officialTeam?.logo})` }}
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
