import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { ITeam, IUser } from "../../types";
import { useGetData, usePostData } from "../../hooks/queries/apiHooks";

import ComingFromDownContainer from "../../ui/ComingFromDownContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputField from "../../forms/InputField";
import PositionSelectField from "./PositionSelectField";
import SelectField from "../../forms/SelectField";
import TextAreaInputField from "../../forms/TextAreaInputField";
import countries from "../../data/countries.json";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
  user: IUser;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const EditProfile: FC<Props> = ({ user, editMode, setEditMode }) => {
  const [formData, setFormData] = useState<IUser>({ ...user });
  const { username, profile, mainTeam, teams, id } = formData;
  const {
    bio,
    displayName,
    country,
    number,
    position,
    userPic,
    birthDate,
    phoneNumber,
  } = profile;

  const { data: allTeams } = useGetData<ITeam[]>({
    url: "https://football-app-back-end.herokuapp.com/api/team/all",
    query: ["teams"],
  });

  // const { mutate: updateUser } = usePostData({
  //   url: `https://football-app-back-end.herokuapp.com/api/user/update/${id}`,
  //   queries: [["teams"]],
  // }); TO CREATE A USEPATCHDATA HOOK
  const userOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const profileOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) =>
    setFormData({
      ...formData,
      profile: { ...profile, [e.target.name]: e.target.value },
    });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(formData);
  };
  const getTeamOptions = () => {
    const filteredTeams = teams.reduce((acc, team) => {
      const found = allTeams?.find((t) => t.id === team);
      if (found) acc.push(found);
      return acc;
    }, [] as ITeam[]);
    return filteredTeams?.map((team) => (
      <option key={team.id} value={team.id}>
        {team.teamName}
      </option>
    ));
  };
  return (
    <ComingFromDownContainer
      editMode={editMode}
      onClose={() => setEditMode(false)}
      title="Edit profile"
    >
      <div className="flex w-full flex-col items-center justify-center">
        <div
          className="h-28 w-28 rounded-full bg-gray-600 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${userPic})` }}
        ></div>
        <button className="mt-4 text-lg font-semibold text-blue-700">
          Change profile picture
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <InputField
          id="username"
          name="username"
          labelName="Username"
          value={username}
          onChange={userOnChange}
          inputClassName="bg-gray-200 p-3 rounded-xl mt-2"
          isRequired
        />
        <InputField
          id="displayName"
          name="displayName"
          labelName="Display name"
          value={displayName}
          onChange={profileOnChange}
          inputClassName="bg-gray-200 p-3 rounded-xl mt-2"
          isRequired
        />
        <div className="grid w-full grid-cols-3 gap-10">
          <PositionSelectField
            formData={formData}
            setFormData={setFormData}
            value={position}
          />
          <SelectField
            id="tshirtNumber"
            name="tshirtNumber"
            labelName="Number"
            value={number?.toString()}
            onChange={profileOnChange}
            selectClassName="bg-gray-200 p-3 rounded-xl mt-2"
            options={Array.from({ length: 99 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num.toString()}>
                <FontAwesomeIcon
                  className="text-gray-600"
                  icon={faChevronDown}
                />
                {num}
              </option>
            ))}
          />
          <SelectField
            id="country"
            name="country"
            labelName="Country"
            onChange={profileOnChange}
            value={country}
            selectClassName="bg-gray-200 p-3 rounded-xl mt-2"
            options={Object.entries(countries).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          />
        </div>
        <InputField
          id="birthDate"
          name="birthDate"
          labelName="Birth date"
          type="date"
          value={birthDate}
          onChange={profileOnChange}
          inputClassName="bg-gray-200 p-3 rounded-xl mt-2"
        />
        <InputField
          id="phoneNumber"
          name="phoneNumber"
          labelName="Phone number"
          value={phoneNumber}
          onChange={profileOnChange}
          inputClassName="bg-gray-200 p-3 rounded-xl mt-2"
        />
        <TextAreaInputField
          id="bio"
          name="bio"
          labelName="Bio"
          value={bio}
          onChange={profileOnChange}
          textAreaClassName="bg-gray-200 p-3 rounded-xl mt-2"
        />
        <SelectField
          id="mainTeam"
          name="mainTeam"
          labelName="Main team"
          value={mainTeam.toString() || ""}
          onChange={profileOnChange}
          selectClassName="bg-gray-200 p-3 rounded-xl mt-2"
          options={getTeamOptions()}
        />
        <button
          className="my-8 w-full rounded-xl bg-pichanga p-3 text-white"
          type="submit"
        >
          Save
        </button>
      </form>
    </ComingFromDownContainer>
  );
};

export default EditProfile;
