import { Dispatch, FC, SetStateAction, useState } from "react";

import ComingFromDownContainer from "../../ui/ComingFromDownContainer";
import { IUser } from "../../types";
import InputField from "../../forms/InputField";
import PositionSelectButton from "./PositionSelectButton";
import SelectPosition from "./SelectPosition";

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
  const profileOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
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
        name="username"
        labelName="Username"
        value={username}
        onChange={userOnChange}
        inputClassName="bg-gray-200 p-3 rounded-xl mt-2"
        isRequired
      />
      <InputField
        name="displayName"
        labelName="Display name"
        value={displayName}
        onChange={profileOnChange}
        inputClassName="bg-gray-200 p-3 rounded-xl mt-2"
        isRequired
      />
      <div className="grid w-full grid-cols-3 gap-10">
        <PositionSelectButton
          formData={formData}
          setFormData={setFormData}
          value={position}
        />
        <InputField
          name="country"
          labelName="Country"
          value={country}
          onChange={profileOnChange}
          inputClassName="bg-gray-200 p-3 rounded-xl mt-2"
        />
      </div>
      <InputField
        name="bio"
        labelName="Bio"
        value={bio}
        onChange={profileOnChange}
        inputClassName="bg-gray-200 p-3 rounded-xl mt-2"
      />
      <button
        className="my-4 w-full rounded bg-pichanga p-3 text-white"
        type="submit"
      >
        Save
      </button>
    </ComingFromDownContainer>
  );
};

export default EditProfile;
