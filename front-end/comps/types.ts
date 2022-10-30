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

export interface IUser {
  sub: string;
  roles: string[];
}

export interface IOfficialTeam {
  id: number;
  name: string;
  logo: string | null;
}
