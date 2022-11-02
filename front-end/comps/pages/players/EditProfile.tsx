import React, { Dispatch, FC, SetStateAction, useState } from "react";

import ComingFromDownContainer from "../../ui/ComingFromDownContainer";
import CustomForm from "../../forms/CustomForm";
import { IUser } from "../../types";
import InputField from "../../forms/InputField";
import SelectPosition from "./SelectPosition";

interface Props {
  user: IUser;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const EditProfile: FC<Props> = ({ user, editMode, setEditMode }) => {
  const [isSelectPositionOpen, setIsSelectPositionOpen] = useState(false);
  const { username, profile, mainTeam, teams } = user;
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
        initialValue={username}
        inputClassName="bg-gray-200 p-3 rounded"
        isRequired
      />
      <InputField
        name="displayName"
        labelName="Display name"
        initialValue={displayName}
        inputClassName="bg-gray-200 p-3 rounded"
        isRequired
      />
      <button onClick={() => setIsSelectPositionOpen(true)}>POSITION</button>
      <InputField
        name="country"
        labelName="Country"
        initialValue={country}
        inputClassName="bg-gray-200 p-3 rounded"
      />
      <InputField
        name="bio"
        labelName="Bio"
        initialValue={bio}
        inputClassName="bg-gray-200 p-3 rounded"
      />
      <button
        className="my-4 w-full rounded bg-pichanga p-3 text-white"
        type="submit"
      >
        Save
      </button>
      {isSelectPositionOpen && <SelectPosition onSelect={() => undefined} />}
    </ComingFromDownContainer>
  );
};

export default EditProfile;
