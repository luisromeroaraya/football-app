import PageSection from "../../../../ui/PageSection";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TopScorers = () => (
  <PageSection title="Top Scorers">
    <table className="w-[calc(100%-2rem)] bg-white text-gray-900 rounded shadow mt-8">
      <thead>
        <tr className="grid w-full grid-cols-6 border-b py-2 font-bold">
          <td className="pl-2">Nr</td>
          <td className="col-span-2 pl-2">Name</td>
          <td className="col-span-2 pl-2">Country</td>
          <td className="pl-2">
            <FontAwesomeIcon icon={faFutbol} />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="grid w-full grid-cols-6 border-b py-2">
          <td className="pl-2">1</td>
          <td className="col-span-2 pl-2">Robert Lewandowski</td>
          <td className="col-span-2 pl-2">Poland</td>
          <td className="pl-2">10</td>
        </tr>
        <tr className="grid w-full grid-cols-6 border-b py-2">
          <td className="pl-2">2</td>
          <td className="col-span-2 pl-2">Harry Kane</td>
          <td className="col-span-2 pl-2">England</td>
          <td className="pl-2">9</td>
        </tr>
      </tbody>
    </table>
  </PageSection>
);

export default TopScorers;
