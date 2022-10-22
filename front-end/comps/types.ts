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
