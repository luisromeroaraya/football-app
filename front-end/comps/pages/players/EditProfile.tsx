import React, { Dispatch, FC, SetStateAction } from "react";

import ComingFromDownContainer from "../../ui/ComingFromDownContainer";
import CustomForm from "../../forms/CustomForm";
import { IUser } from "../../types";
import InputField from "../../forms/InputField";

interface Props {
  user: IUser;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const EditProfile: FC<Props> = ({ user, editMode, setEditMode }) => {
  const { username, profile } = user;
  const { bio, display_name, country, number, position, picture, teams } =
    profile;
  return (
    <ComingFromDownContainer
      editMode={editMode}
      onClose={() => setEditMode(false)}
      title="Edit profile"
    >
      <div className="flex w-full flex-col items-center justify-center">
        <div className="h-28 w-28 rounded-full bg-gray-600"></div>
        <button className="mt-4 text-lg font-semibold text-blue-700">
          Change profile picture
        </button>
      </div>
      <CustomForm onSubmit={(data) => console.log(data)}>
        <InputField
          name="username"
          labelName="Username"
          initialValue={username}
          inputClassName="bg-gray-200 p-3 rounded"
          isRequired
        />
        <InputField
          name="display_name"
          labelName="Display name"
          initialValue={display_name}
          inputClassName="bg-gray-200 p-3 rounded"
          isRequired
        />
        <InputField
          name="position"
          labelName="Position"
          initialValue={position}
          inputClassName="bg-gray-200 p-3 rounded"
        />
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
      </CustomForm>
    </ComingFromDownContainer>
  );
};

export default EditProfile;
