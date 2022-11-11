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
  sub: string;
  roles: string[];
  token: string;
  iat: number;
  jti: string;
  expires: string;
}

export interface IUser {
  id: number;
  enabled: boolean;
  email: string;
  username: string;
  profile: IUserProfile;
  mainTeam: number;
  teams: number[];
}

export interface ISession {
  user: ISessionUser;
}

export interface IUserProfile {
  id: number;
  displayName: string;
  userPic: string;
  role: string;
  position: string | null;
  number?: number;
  phoneNumber: string;
  country: string;
  bio: string;
  birthDate: string;
  goals?: number;
  matches?: number;
  fans?: number[];
}

export interface ITeam {
  id: number;
  teamName: string;
  nationality: string; // Do we need this?
  createdAt: string;
  createdBy: number;
  players: number[];
  logo: string | null;
}

export type IPosition =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "CDM"
  | "CM"
  | "LM"
  | "RM"
  | "CAM"
  | "CF"
  | "ST"
  | "LW"
  | "RW";
