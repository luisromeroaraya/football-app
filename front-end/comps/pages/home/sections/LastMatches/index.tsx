import LastMatch from "./LastMatch";
import PageSection from "../../../../ui/PageSection";

const matches = [
  {
    id: 1,
    date: "Sat 03/04/2022",
    time: "20:00",
    teamA: {
      name: "Team A",
      goals: [{ id: "goal1", player: { id: "2", name: "Sebastian Herrera", nationality: "chile" }, time: "15'" }],
      logo: null,
    },
    teamB: {
      name: "Team B",
      goals: [{ id: "goal2", player: { id: "1", name: "Daniel Gonzalez", nationality: "argentina" }, time: "18'" }],
      logo: null,
    },
  },
  {
    id: 2,
    date: "Sat 03/04/2022",
    time: "20:00",
    teamA: {
      name: "Team C",
      goals: [{ id: "goal3", player: { id: "3", name: "Juan Perez", nationality: "chile" }, time: "15'" }],
      logo: null,
    },
    teamB: {
      name: "Team D",
      goals: [{ id: "goal4", player: { id: "4", name: "Pedro Lopez", nationality: "argentina" }, time: "18'" }],
      logo: null,
    },
  },
];

const LastMatches = () => (
  <PageSection title="Last Matches">
    {matches.map((match) => (
      <LastMatch {...match} key={match.id} />
    ))}
    {/* ADD PAGINATION */}
  </PageSection>
);

export default LastMatches;
