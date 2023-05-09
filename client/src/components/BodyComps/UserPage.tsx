import UserService from "../../services/UserService";
import { IUser } from "../../models/IUser";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import $api from "../../http";
import { API_URL } from "../../http";
import Avatar from "react-avatar";
import DateFormater from "../UniversalComps/DateFormater";
import InviteButtons from "./UserPageComps/InviteButtons";
import { observer } from "mobx-react-lite";
import Invites from "./TicketsPageComps/Invites";
import AdminButtons from "./UserPageComps/AdminButtons";
import { ITicket } from "../../models/ITicket";
import { IEvent } from "../../models/IEvent";
import { Link } from "react-router-dom";
import { storeAnnotation } from "mobx/dist/internal";
import AcceptPropositionPage from "./AcceptPropositionPage";
import AcceptPropositionButton from "./UserPageComps/AcceptPropositionButton";
import EditButton from "./UserAccountPageComps/EditButton";
import ExtraInput from "./UserAccountPageComps/ExtraForm";
import ReactDatePicker from "react-datepicker";
import { Context } from "../..";
import GenderDisplayer from "../UniversalComps/GenderDisplayer";
import FileUploader from "./UserEventsPageComps/UserAvatarUploader";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import History from "./EventPageComps/History";
import UserFeedBacks from "./UserPageComps/UserFeedBacks";
import Rating from "./UserPageComps/Rating";
import { ImCross } from "react-icons/im";
import ArrayMapper from "../UniversalComps/ArrayMapper";

const UserPage: React.FC = () => {
  let url = API_URL!.replace("/api", "");

  const { store } = useContext(Context);

  const [editMode, setEditMode] = useState<boolean>(false);
  const params = useParams();
  const userId = params.userId ?? "";

  const [name, setName] = useState<string>();
  const [surname, setSurame] = useState<string>();
  const [login, setLogin] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [birthday, setBirthday] = useState<Date>();
  const [cell, setCell] = useState<string>();
  const [city, setCity] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [avatar, setAvatar] = useState<File>();
  const [avatarPath, setAvatarPath] = useState<string>();
  const [description, setDesctiption] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [genres, setGenres] = useState<string[]>();
  const [instrument, setInstrument] = useState<string>("");
  const [instruments, setInstruments] = useState<string[]>();

  const [user, setUser] = useState<IUser>();

  const changeHandler = async () => {
    await UserService.update(
      userId,
      name!,
      surname!,
      login!,
      email!,
      cell!,
      city!,
      gender!,
      description!,
      birthday!,
      genres!,
      instruments!
    );
    await UserService.changeAvatar(avatar!);
    // window.location.reload();
  };

  const getData = async () => {
    await $api.get("/user/" + userId).then((response) => {
      setUser(response.data);
      setName(response.data.name);
      setSurame(response.data.surname);
      setLogin(response.data.login);
      setEmail(response.data.email);
      setAvatarPath(response.data.avatar);
      setBirthday(new Date(response.data.birthday));
      setCell(response.data.cell);
      setCity(response.data.city);
      setDesctiption(response.data.desc);
      setGender(response.data.gender);
      setGenres(response.data.genres);
      setInstruments(response.data.instruments);
    });
  };
  React.useEffect(() => {
    if (userId) getData();
  }, [userId]);

  return (
    <div className="bg-gray-100 p-5">
      <div className="absolute right-0 mr-6">
        {userId == store.user._id && (
          <EditButton value={editMode} setValue={setEditMode} size={25} />
        )}
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        <div className="grid grid-col gap-5 h-fit">
          <div className="p-10 bg-white rounded w-80 flex flex-col border drop-shadow h-fit gap-2">
            <div className="flex justify-center">
              <Avatar
                name={login}
                src={
                  avatar ? URL.createObjectURL(avatar) : url + "/" + avatarPath
                }
                className="rounded"
                size="200"
              />
            </div>
            <FileUploader display={editMode} setFile={setAvatar} />
            <div className="flex justify-center p-5">
              {(editMode && (
                <ExtraInput
                  editMode={editMode}
                  value={login!}
                  setValue={setLogin}
                />
              )) ||
                (store.user._id == user?._id && (
                  <p className="text-4xl">Вітаємо, {user?.login}</p>
                )) || <p className="text-4xl">{user?.login}</p>}
            </div>
          </div>
          <InviteButtons userId={userId} />
          <div>
            <AcceptPropositionButton
              userId={user?._id!}
              className="flex flex-col gap-2 p-4 bg-white rounded drop-shadow border-2 border-yellow-200"
            />
          </div>
        </div>
        <div className="p-10 bg-white border drop-shadow rounded md:w-7/12 sm:w-full grid grid-col h-fit gap-8">
          <div>
            <div>
              <p>Інформація про користувача:</p>
            </div>
            <div className="py-2 px-4">
              {(editMode && (
                <div className="flex flex-col gap-2">
                  {description == "" && (
                    <div className="bg-yellow-100 border-2 border-yellow-400 rounded p-2 flex flex-col gap-2">
                      <div>
                        опишіть себе, щоб інші користувачі могли побачити
                        інформацію про вас
                      </div>
                      <BsFillArrowDownCircleFill />
                    </div>
                  )}
                  <textarea
                    value={description}
                    onChange={(e) => setDesctiption(e.target.value)}
                    className={"w-full border-2 rounded"}
                  />
                </div>
              )) ||
                (description == "" && (
                  <p className="text-gray-400">інформація не вказана</p>
                )) || <p>{description}</p>}
            </div>
          </div>
          <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-5">
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Рейтинг:</p>
              </div>
              <div className="flex flex-row-reverse">
                <Rating userId={user?._id!} />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Ім'я:</p>
              </div>
              <div className="flex flex-row-reverse">
                <ExtraInput
                  value={name!}
                  setValue={setName}
                  editMode={editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Прізвище:</p>
              </div>
              <div className="flex flex-row-reverse">
                <ExtraInput
                  value={surname!}
                  setValue={setSurame}
                  editMode={editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Електронна пошта:</p>
              </div>
              <div className="flex flex-row-reverse">
                <ExtraInput
                  value={email!}
                  setValue={setEmail}
                  editMode={editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Номер телефону:</p>
              </div>
              <div className="flex flex-row-reverse">
                <ExtraInput
                  value={cell!}
                  setValue={setCell}
                  editMode={editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Стать:</p>
              </div>
              <div className="flex flex-row-reverse">
                {(editMode && (
                  <select
                    value={gender}
                    className="rounded p-1 focus:border-2 border-cyan-600"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">чоловіча</option>
                    <option value="female">жіноча</option>
                    <option value="none">не вказувати</option>
                  </select>
                )) || <GenderDisplayer gender={gender!} className="" />}
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Місто:</p>
              </div>
              <div className="flex flex-row-reverse">
                <ExtraInput
                  value={city!}
                  setValue={setCity}
                  editMode={editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Дата народження:</p>
              </div>
              <div className="flex flex-row-reverse">
                {(editMode && (
                  <ReactDatePicker
                    className="w-full rounded p-1"
                    selected={birthday}
                    onChange={(date: Date) => setBirthday(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                )) || <DateFormater value={birthday} dayOfWeek={false} />}
              </div>
            </div>
            {(editMode && (
              <div className="flex flex-col gap-2 border-2 bg-gray-200 rounded p-2">
                <label className="text-center text-xl">Жанри:</label>
                <div className="flex justify-center gap-2">
                  <input
                    className="border-2 border-gray-300 rounded"
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  <button
                    className="bg-cyan-500 text-white hover:bg-cyan-400 rounded px-2 py-1 drop-shadow"
                    onClick={() => {
                      setGenres(genres?.concat(genre!));
                      setGenre("");
                    }}
                  >
                    додати...
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-4">
                  {genres?.map((genre: string) => {
                    return (
                      <div className="bg-white rounded drop-shadow py-2 px-4 w-fit flex space-between gap-8">
                        <div className="text-center">{genre}</div>
                        <div className="mt-1">
                          <button
                            onClick={() => {
                              setGenres(
                                genres.filter((g) => {
                                  return g != genre;
                                })
                              );
                            }}
                          >
                            <ImCross color="red" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )) || (
              <div>
                <div>Переважні жанри користувача:</div>
                <ArrayMapper
                  array={genres!}
                  className="flex flex-wrap gap-2 p-2"
                  itemClassName="bg-gray-100 rounded drop-shadow py-2 px-4"
                />
              </div>
            )}
            {(editMode && (
              <div className="flex flex-col gap-2 border-2 bg-gray-200 rounded p-2">
                <label className="text-center text-xl">
                  Музичні інструменти:
                </label>
                <div className="flex justify-center gap-2">
                  <input
                    className="border-2 border-gray-300 rounded"
                    type="text"
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                  />
                  <button
                    className="bg-cyan-500 text-white hover:bg-cyan-400 rounded px-2 py-1 drop-shadow"
                    onClick={() => {
                      setInstruments(instruments?.concat(instrument!));
                      setInstrument("");
                    }}
                  >
                    додати...
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-4">
                  {instruments?.map((instrument: string) => {
                    return (
                      <div className="bg-white rounded drop-shadow py-2 px-4 w-fit flex space-between gap-8">
                        <div className="text-center">{instrument}</div>
                        <div className="mt-1">
                          <button
                            onClick={() => {
                              setInstruments(
                                instruments.filter((i) => {
                                  return i != instrument;
                                })
                              );
                            }}
                          >
                            <ImCross color="red" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )) || (
              <div>
                <div>Музичні інструенти користувача:</div>
                <ArrayMapper
                  array={instruments!}
                  className="flex flex-wrap gap-2 p-2"
                  itemClassName="bg-gray-100 rounded drop-shadow py-2 px-4"
                />
              </div>
            )}
            {editMode && (
              <div className="flex justify-center bg-green-400 hover:bg-green-200 rounded drop-shadow col-span-2">
                <button type="button" className="p-2" onClick={changeHandler}>
                  Застосувати зміни
                </button>
              </div>
            )}
          </div>
        </div>
        <History userId={user?._id!} />
        <UserFeedBacks userId={user?._id!} />
      </div>
    </div>
  );
};

export default observer(UserPage);
