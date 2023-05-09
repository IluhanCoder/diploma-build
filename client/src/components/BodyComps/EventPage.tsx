import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import $api from "../../http";
import { IEvent, IParticipant } from "../../models/IEvent";
import { API_URL } from "../../http";
import DateFormater from "../UniversalComps/DateFormater";
import ArrayMapper from "../UniversalComps/ArrayMapper";
import ImgDisplayer from "../UniversalComps/ImgDisplayer";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import NewSongButton from "./EventPageComps/NewSongButton";
import AdminButtons from "./EventPageComps/AdminButtons";
import EventStatus from "./EventsPageComps/EventStatus";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import ProposeButtons from "../BodyComps/EventPageComps/ProposeButtons";
import { IComment } from "../../models/IComment";
import EventService from "../../services/EventService";
import CommentAdmin from "../UniversalComps/CommentAdmin";
import Comments from "./EventsPageComps/Comments";
import { useLocation } from "react-router";
import AcceptInviteButton from "./EventPageComps/AcceptInviteButton";
import PropositionButton from "./EventPageComps/PropositionButton";
import rightsArray from "../../static/rights-array";
import Songs from "./EventPageComps/Songs";
import UserService from "../../services/UserService";

type LocalParams = {
  eventId: string;
};

const url = API_URL!.replace("/api", "");

const EventPage = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const { eventId } = useParams<LocalParams>();

  const [event, setEvent] = useState<IEvent>();
  const [userRights, setUserRights] = useState<number>();
  const [commentInput, setCommentInput] = useState<string>();

  const submitHandler = () => {
    EventService.submitEvent(event?._id!);
    window.location.reload();
  };

  const deleteHandler = () => {
    EventService.deleteEvent(event?._id!);
    navigate("/events");
  };

  const isDone = () => {
    return new Date().getTime() >= new Date(event?.date!).getTime();
  };

  const getData = () => {
    EventService.getEvent(eventId!).then((res) => {
      setEvent(res.data);
      setUserRights(
        res.data.participants.filter((participant: IParticipant) => {
          return participant._id == store.user._id;
        })[0].rights
      );
    });
  };
  useEffect(() => {
    if (eventId) getData();
  }, [eventId, setEvent]);

  return (
    <div className="grid grid-cols-3 w-full bg-gray-200 p-4 gap-4">
      {isDone() && store.user._id == event?.creator._id && (
        <div className="bg-yellow-100 text-yellow-500 flex justify-center pt-4 border-2 border-yellow-500 rounded drop-shadow">
          <div>
            Подію завершено, не бажаєте залишити{" "}
            <Link
              to={`/feedback/${event?._id}`}
              className="underline font-bold"
            >
              відгуки учасникам?
            </Link>
          </div>
        </div>
      )}
      {(UserService.isAdmin(store.user._id) ||
        event?.creator._id == store.user._id ||
        userRights! <= 1) && (
        <div className="bg-white rounded drop-shadow flex justify-center p-2 gap-4 col-start-2">
          {store.user.login == "ADMIN" && !event?.isSubmited && (
            <button
              className="bg-green-500 text-white hover:bg-green-300 rounded p-2"
              onClick={() => submitHandler()}
            >
              Підтвердити
            </button>
          )}
          {(!userRights || userRights == 0) && (
            <button
              className="bg-red-500 text-white hover:bg-red-300 rounded p-2"
              onClick={() => deleteHandler()}
            >
              Видалити
            </button>
          )}
          {store.user.login != "ADMIN" && (
            <Link
              to={`/event-edit/${event?._id}`}
              className="bg-yellow-500 hover:bg-yellow-300 p-2 rounded drop-shadow text-white"
            >
              Редагувати
            </Link>
          )}
        </div>
      )}
      <div className="col-span-3 flex flex-row gap-2 mx-6">
        <div className="bg-white flex justify-between rounded drop-shadow grow px-12 py-14">
          <div className="text-center text-4xl">{event?.name}</div>
          {(!isDone() && (
            <div className="flex gap-2 flex-row-reverse">
              {(!event?.isSubmited && (
                <div className="bg-red-200 text-red-400 rounded border-2 border-red-400 p-2">
                  подію не підтверджено
                </div>
              )) || (
                <div className="bg-green-200 text-green-400 rounded border-2 border-green-400 p-2">
                  подію підтверджено
                </div>
              )}
              {(event?.musiciansNeeded.length! > 0 && (
                <div className="bg-yellow-200 text-yellow-600 rounded border-2 border-yellow-600 p-2">
                  потрібні учасники
                </div>
              )) || (
                <div className="bg-blue-200 text-blue-400 rounded border-2 border-blue-400 p-2">
                  укомплектовано
                </div>
              )}
            </div>
          )) ||
            (isDone() && (
              <div className="flex gap-2 flex-row-reverse">
                <div className="bg-gray-200 text-gray-400 rounded border-2 border-gray-400 p-2">
                  подія вже пройшла
                </div>
              </div>
            ))}
        </div>
        <div className="bg-white rounded drop-shadow w-fit px-4 py-1 flex-col gap-2">
          <div className="text-center">Сворив подію:</div>
          <Link
            to={`/user/${event?.creator._id}`}
            className="flex justify-center"
          >
            <Avatar
              src={url + "/" + event?.creator.avatar}
              className="rounded"
              name={event?.creator.login}
            />
          </Link>
          <div className="text-center">{event?.creator.login}</div>
        </div>
      </div>
      <div className="bg-white rounded drop-shadow p-2">
        <ImgDisplayer src={url + "/" + event?.avatar} />
      </div>
      <div className="flex flex-col bg-white rounded drop-shadow p-4">
        <div className="text-center text-2xl">Опис події:</div>
        <div className="p-6">
          <p>{event?.desc}</p>
        </div>
      </div>
      <div className="bg-white drop-shadow rounded flex flex-col p-4 gap-4">
        <div className="text-center text-2xl">пісні:</div>
        <Songs
          eventId={eventId!}
          className="flex flex-wrap gap-2 overflow-auto h-16 justify-center"
        />
        <div className="flex flex-col overflow-auto"></div>
        {(store.user._id == event?.creator._id ||
          event?.participants.some((participant: IParticipant) => {
            return participant._id == store.user._id && participant.rights <= 2;
          })) && (
          <div className="flex justify-center">
            <Link
              to={`/song-form/${eventId}`}
              className="bg-green-500 rounded drop-shadow px-2 py-1 hover:bg-green-300 text-white"
            >
              додати пісню
            </Link>
          </div>
        )}
      </div>
      <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-4">
        <div className="text-center bg-gray-300 rounded drop-whadow flex justify-between py-2 px-4">
          <div>Дата проведення:</div>
          <div>
            <DateFormater value={event?.date} dayOfWeek />
          </div>
        </div>
        <div className="text-center bg-gray-300 rounded drop-whadow flex justify-between py-2 px-4">
          <div>Місто:</div>
          <div>{event?.adress}</div>
        </div>
      </div>
      <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-4">
        <div className="text-center">Жанри:</div>
        <ArrayMapper
          className="flex flex-wrap gap-2 overflow-auto"
          itemClassName="bg-gray-300 rounded drop-shadow p-3"
          array={event?.genres ?? []}
        />
      </div>
      <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-4">
        <div className="text-center">Потрібні музиканти:</div>
        {(event?.musiciansNeeded.length && (
          <ArrayMapper
            className="flex flex-wrap gap-2 overflow-auto"
            itemClassName="bg-gray-300 rounded drop-shadow p-3"
            array={event?.musiciansNeeded ?? []}
          />
        )) || (
          <div className="flex justify-center text-gray-500">
            Нема потреби в музикантах
          </div>
        )}
      </div>
      <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-4">
        <div className="text-center">Технічний райдер:</div>
        <div>
          <p>{event?.rider}</p>
        </div>
      </div>
      <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-2 col-span-2">
        <div className="text-center">Учасники:</div>
        <div className="p-4 flex gap-2 overflow-auto">
          {(event?.participants.length! > 0 &&
            event?.participants.map((participant: IParticipant) => {
              return (
                <Link to={`/user/${participant._id}`} key={participant._id}>
                  <div className="bg-cyan-500 hover:bg-cyan-300 drop-shadow rounded text-white flex flex-col py-4 px-8 gap-2">
                    <div className="text-center text-xl">
                      {participant.name}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <div>Роль:</div>
                        <div>{participant.role}</div>
                      </div>
                      <div className="flex gap-2">
                        <div>Права:</div>
                        <div>{rightsArray[participant.rights]}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })) || (
            <div className="col-span-2 text-center text-gray-500">
              Учасників нема
            </div>
          )}
        </div>
      </div>
      <PropositionButton event={event!} />
      <AcceptInviteButton
        eventId={event?._id!}
        className="bg-white rounded p-2 drop-shadow flex justify-center gap-2 col-start-2"
      />
      <Comments eventId={eventId!} />
    </div>
  );
};

export default observer(EventPage);
