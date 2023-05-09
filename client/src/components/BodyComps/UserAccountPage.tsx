import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import IRoute from "../../interfaces/route";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { storeAnnotation } from "mobx/dist/internal";
import FileUploader from "./UserEventsPageComps/UserAvatarUploader";
import { API_URL } from "../../http";
import DateFormater from "../UniversalComps/DateFormater";
import Avatar from "react-avatar";
import { BiPencil } from "react-icons/bi";
import EditButton from "./UserAccountPageComps/EditButton";
import ExtraInput from "./UserAccountPageComps/ExtraForm";
import DatePicker from "react-datepicker";
import SubmitChangesButton from "./UserAccountPageComps/SubmitChangesButton";

export const Profile = () => {
  const { store } = useContext(Context);
  const currentUser = store.user;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [login, setLogin] = useState<string>(currentUser.login);
  const [email, setEmail] = useState<string>(currentUser.email);
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [cell, setCell] = useState<string>(currentUser.cell);
  const [city, setCity] = useState<string>(currentUser.city);
  const [gender, setGender] = useState<string>(currentUser.gender);
  const [avatar, setAvatar] = useState<File>();
  const [avatarPath, setAvatarPath] = useState<string>(currentUser.avatar);

  useEffect(() => {
    setLogin(currentUser.login);
    setEmail(currentUser.email);
    setAvatarPath(currentUser.avatar);
    // setBirthday(currentUser.birthday);
    setCell(currentUser.cell);
    setCity(currentUser.city);
    setGender(currentUser.gender);
  }, [currentUser, editMode]);

  let url = API_URL!.replace("/api", "");

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="flex justify-center flex-col w-1/2">
        <div className="flex justify-center mt-6">
          <h1 className="text-3xl">Обліковий запис користувача</h1>
        </div>
        <div className="relative flex bg-white drop-shadow mt-5 rounded p-6 justify-center mb-10">
          <div className="absolute right-0 mr-6">
            <EditButton value={editMode} setValue={setEditMode} size={25} />
          </div>
          <div className="w-10/12 flex justify-center">
            <div className="flex flex-col w-3/4">
              <div className="flex justify-center flex-col">
                <div className="p-2 flex justify-center">
                  <Avatar
                    name={login}
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : url + "/" + avatarPath
                    }
                    className="rounded"
                    size="200"
                  />
                </div>
                <div className="p-2 flex justify-center">
                  <FileUploader display={editMode} setFile={setAvatar} />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-5">
                <div className="flex flex-row w-full">
                  <p>Логін</p>
                  <div className="w-full flex flex-row-reverse">
                    <ExtraInput
                      value={login}
                      editMode={editMode}
                      setValue={setLogin}
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <p>Email</p>
                  <div className="w-full flex flex-row-reverse">
                    <ExtraInput
                      value={email}
                      editMode={editMode}
                      setValue={setEmail}
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <p>Дата народження</p>
                  <div className="w-full flex flex-row-reverse">
                    <div className="">
                      <DatePicker
                        className="block border border-grey-light p-3 rounded"
                        selected={birthday}
                        onChange={(date: Date) => setBirthday(date)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <p>Номер телефону</p>
                  <div className="w-full flex flex-row-reverse">
                    <ExtraInput
                      value={cell}
                      editMode={editMode}
                      setValue={setCell}
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <p>Місто</p>
                  <div className="w-full flex flex-row-reverse">
                    <ExtraInput
                      value={city}
                      editMode={editMode}
                      setValue={setCity}
                    />
                  </div>
                </div>
                <div className="flex flex-row">
                  <p>Стать</p>
                  <div className="w-full flex flex-row-reverse">
                    <ExtraInput
                      value={gender}
                      editMode={editMode}
                      setValue={setGender}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-8">
                <div>
                  <SubmitChangesButton
                    display={editMode}
                    user={currentUser}
                    email={email}
                    login={login}
                    cell={cell}
                    city={city}
                    gender={gender}
                    avatar={avatar!}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Profile);
