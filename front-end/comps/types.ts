export interface IPlayer {
  id: number;
  name: string;
  nationality: string;
}

export interface IGoal {
  id: number;
  time: string;
  player: IPlayer;
}

export interface IMatchTeam {
  name: string;
  logo: string | null;
  goals: IGoal[];
}

export interface ISessionUser {
  id: number;
  sub: string;
  roles: string[];
  token: string;
  iat: number;
  jti: string;
  expires: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  profile: IUserProfile;
}

export interface ISession {
  user: ISessionUser;
}

export interface IUserProfile {
  id: number;
  display_name: string;
  picture: string;
  position: string;
  number: number;
  teams: ITeam[];
  country: string;
  bio: string;
  goals: number;
  matches: number;
  fans: number[];
}
export interface ITeam {
  id: number;
  name: string;
  logo: string | null;
  is_official: boolean;
}
