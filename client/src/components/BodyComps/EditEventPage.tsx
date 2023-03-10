import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { IEvent, IParticipant } from "../../models/IEvent";
import EventService from "../../services/EventService";
import { ImCross } from "react-icons/im";
import ReactDatePicker from "react-datepicker";
import Avatar from "react-avatar";
import { API_URL } from "../../http";
import ImgDisplayer from "../UniversalComps/ImgDisplayer";
import FileUploader from "./UserEventsPageComps/UserAvatarUploader";
import { Link } from "react-router-dom";
import RoleInput from "./EditEventPageComps/RoleInput";
import RightsInput from "./EditEventPageComps/RightsInput";
import { Context } from "../..";

const EditEventPage = () => {
  const { eventId } = useParams();
  const [name, setName] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [rider, setRider] = useState<string>();
  const [genres, setGenres] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const [adress, setAdress] = useState<string>();
  const [avatar, setAvatar] = useState<File>();
  const [avatarPath, setAvatarPath] = useState<string>();
  const [genre, setGenre] = useState<string>();
  const [musiciansNeeded, setMusiciansNeeded] = useState<string[]>([]);
  const [neededMusician, setNeededMusician] = useState<string>("");
  const [participants, setParticipants] = useState<IParticipant[]>();
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const url = API_URL.replace("/api", "");

  const getData = () => {
    EventService.getEvent(eventId!).then((res) => {
      setName(res.data.name);
      setDesc(res.data.desc);
      setRider(res.data.rider);
      setGenres(res.data.genres);
      setDate(new Date(res.data.date));
      setAdress(res.data.adress);
      setParticipants(res.data.participants);
      setAvatarPath(res.data.avatar);
      setMusiciansNeeded(res.data.musiciansNeeded);
    });
  };

  const deleteParticipantHandler = (participantId: string) => {
    const isConfirmed = window.confirm(
      "Ви дійсно хочете видалити цього користувача?"
    );
    if (isConfirmed) {
      let newParticipants = participants?.filter(
        (participant: IParticipant) => {
          return participant._id != participantId;
        }
      );
      setParticipants(newParticipants);
    }
  };

  const submitChangesHandler = async () => {
    await EventService.update(
      eventId!,
      name!,
      desc!,
      rider!,
      genres ?? [],
      date!,
      adress!,
      participants ?? [],
      musiciansNeeded ?? []
    );
    await EventService.setAvatar(eventId!, avatar!);
    navigate(`/event/${eventId}`);
    window.location.reload();
  };

  useEffect(() => {
    if (eventId) getData();
  }, [eventId]);

  return (
    <div className="flex justify-center p-8 bg-gray-100">
      <div className="bg-white rounded drop-shadow flex flex-col gap-4 py-4 px-10 w-full">
        <div className="text-center text-2xl">Редагування події:</div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 col-span-2 grow p-4">
            <div className="flex gap-4">
              <label className="">Назва події:</label>
              <input
                className="border-2 border-gray-300 rounded px-2 grow"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <label>Адреса:</label>
              <input
                className="border-2 border-gray-300 rounded px-2 grow"
                type="text"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <label>Дата проведення:</label>
              <div className="grow">
                <ReactDatePicker
                  className="border-2 w-full border-gray-300 rounded px-2"
                  selected={date}
                  onChange={(date: Date) => {
                    setDate(date);
                  }}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded drop-shadow flex flex-col gap-2 justify-center p-4">
            <ImgDisplayer
              src={
                avatar ? URL.createObjectURL(avatar) : url + "/" + avatarPath
              }
              className="w-44 mx-auto"
            />
            <div className="flex justify-center">
              <FileUploader
                className="w-3/4"
                display={true}
                setFile={setAvatar}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
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
          <div className="flex flex-col gap-2 border-2 bg-gray-200 rounded p-2">
            <label className="text-center text-xl">Потрібні:</label>
            <div className="flex justify-center gap-2">
              <input
                className="border-2 border-gray-300 rounded"
                type="text"
                value={neededMusician}
                onChange={(e) => setNeededMusician(e.target.value)}
              />
              <button
                className="bg-cyan-500 text-white hover:bg-cyan-400 rounded px-2 py-1 drop-shadow"
                onClick={() => {
                  setMusiciansNeeded(musiciansNeeded?.concat(neededMusician!));
                  setNeededMusician("");
                }}
              >
                додати...
              </button>
            </div>
            <div className="flex flex-wrap gap-2 p-4">
              {musiciansNeeded?.map((musician: string) => {
                return (
                  <div className="bg-white rounded drop-shadow py-2 px-4 w-fit flex space-between gap-8">
                    <div className="text-center">{musician}</div>
                    <div className="mt-1">
                      <button
                        onClick={() => {
                          setMusiciansNeeded(
                            musiciansNeeded!.filter((m) => {
                              return m != musician;
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-center">
            <label>опис події:</label>
            <textarea
              className="border-2 rounded border-gray-300"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label>технічний райдер:</label>
            <textarea
              className="border-2 rounded border-gray-300"
              value={rider}
              onChange={(e) => {
                setRider(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="rounded drop-shadow flex flex-col gap-2 justify-center">
          <div className="text-center text-xl">Користувачі:</div>
          <table className="w-full flex-col gap-2 border border-slate-500 border-collapse">
            <tr className="bg-gray-300">
              <th>Користувач</th>
              <th>Роль</th>
              <th>Права</th>
              <th />
            </tr>
            {participants?.map((participant: IParticipant) => {
              if (participant._id != store.user._id)
                return (
                  <tr className="bg-white">
                    <td className="p-2">
                      <div className="flex justify-center">
                        <Link
                          className="font-bold underline"
                          to={`user/${participant._id}`}
                        >
                          {participant.name}
                        </Link>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex justify-center">
                        <RoleInput
                          setRoles={setMusiciansNeeded}
                          roles={musiciansNeeded ?? []}
                          participant={participant}
                          participants={participants}
                          setParticipants={setParticipants}
                        />
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex justify-center">
                        <RightsInput
                          participant={participant}
                          participants={participants}
                          setParticipants={setParticipants}
                        />
                      </div>
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        onClick={() => {
                          deleteParticipantHandler(participant._id);
                        }}
                      >
                        <ImCross color="red" />
                      </button>
                    </td>
                  </tr>
                );
            })}
          </table>
        </div>
        <div className="flex justify-center">
          <button
            onClick={submitChangesHandler}
            className="bg-green-500 hover:bg-green-300 rounded drop-shadow p-2"
          >
            застосувати зміни
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;
