import UserService from "../../../services/UserService";
import { Context } from "../../../index";
import { useContext } from "react";
import { IUser } from "../../../models/IUser";

type LocalParams = {
  user: IUser;
  display: boolean;
  email: string;
  login: string;
  cell: string;
  city: string;
  gender: string;
  avatar: File;
};

const SubmitChangesButton = (params: LocalParams) => {
  const { user, email, login, cell, city, gender, avatar } = params;

  const handleButtonClick = async () => {
    // UserService.update(user, login, email , cell, city, gender);
    console.log("atatata")
    await UserService.changeAvatar(avatar);
    // window.location.reload();
  };

  if (params.display)
    return (
      <button
        type="button"
        className="flex justify-center bg-green-300 p-2 rounded hover:bg-green-100"
        onClick={handleButtonClick}
      >
        Застосувати зміни
      </button>
    );
  else return <></>;
};

export default SubmitChangesButton;
