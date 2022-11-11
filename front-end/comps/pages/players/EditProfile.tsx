import { Dispatch, FC, SetStateAction, useState } from "react";

import ComingFromDownContainer from "../../ui/ComingFromDownContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "../../types";
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
  const { username, profile, mainTeam, teams } = formData;
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
              <FontAwesomeIcon className="text-gray-600" icon={faChevronDown} />
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
      <TextAreaInputField
        id="bio"
        name="bio"
        labelName="Bio"
        value={bio}
        onChange={profileOnChange}
        textAreaClassName="bg-gray-200 p-3 rounded-xl mt-2"
      />
      <button
        className="my-8 w-full rounded-xl bg-pichanga p-3 text-white"
        type="submit"
      >
        Save
      </button>
    </ComingFromDownContainer>
  );
};

export default EditProfile;
