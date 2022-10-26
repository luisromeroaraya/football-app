export interface IPlayer {
  id: string;
  name: string;
  nationality: string;
}

export interface IGoal {
  id: string;
  time: string;
  player: IPlayer;
}

export interface IMatchTeam {
  name: string;
  logo: string | null;
  goals: IGoal[];
}

export interface IUser {
  id: number;
  email: string;
  name?: string;
  role: string;
}
export type IJWTresponse = {
  token: string;
};
