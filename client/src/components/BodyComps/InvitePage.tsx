import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import { IEvent, IParticipant } from "../../models/IEvent";
import EventService from "../../services/EventService";
import InviteService from "../../services/InviteService";
import DateFormater from "../UniversalComps/DateFormater";
import SmallEventMapper from "../UniversalComps/SmallEventMapper";
import SmallEvent from "./InvitePageComps/EventMapperComps/SmallEvent";

const InvitePage = () => {
  const { store } = useContext(Context);
  const currentUser = store.user;
  const { receiverId } = useParams();
  const [events, setEvents] = useState<IEvent[]>();
  const [selectedEvent, setSelectedEvent] = useState<number>(-1);
  const [selectedRole, setSelectedRole] = useState<number>(-1);
  const [comment, setComment] = useState<string>("");
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const inviteHandler = async () => {
    try {
      await InviteService.newInvite(
        store.user._id,
        receiverId!,
        events![selectedEvent]._id,
        events![selectedEvent].musiciansNeeded[selectedRole],
        comment
      );
    } catch (error: any) {
      let tempArray: Array<string> = [error.response.data.message];
      error?.response?.data?.errors.map((error: any) =>
        tempArray.push(error.msg)
      );
      setErrorMessages(tempArray);
    }
  };

  const filterEvents = (eventsParam: IEvent[]) => {
    return eventsParam?.filter((event: IEvent) => {
      return (
        event.musiciansNeeded.length > 0 &&
        !event.participants.some((participant: IParticipant) => {
          return participant._id == receiverId;
        })
      );
    });
  };

  const getEvents = () => {
    EventService.getEventsWithRights(currentUser._id, 1).then((res) =>
      setEvents(res.data)
    );
  };
  useEffect(() => {
    if (currentUser._id) getEvents();
  }, [currentUser._id]);

  if (events && filterEvents(events!).length > 0) {
    return (
      <div className="flex flex-col p-4 gap-4">
        <div className="p-6">
          <div className="flex justify-center text-2xl">
            Будь-ласка, оберіть подію, на участь в якій ви хочете запросити
            користувача:
          </div>

          <div className="flex justify-center">
            <div className="flex flex-wrap gap-4 p-4">
              {filterEvents(events!).map((event: IEvent) => {
                const currentIndex = events.indexOf(event);
                return (
                  <button
                    key={currentIndex}
                    type="button"
                    onClick={() => {
                      setSelectedEvent(currentIndex);
                      setSelectedRole(-1);
                    }}
                    className={
                      (currentIndex == selectedEvent
                        ? "bg-cyan-500"
                        : "bg-cyan-400") +
                      " p-4 rounded drop-shadow" +
                      " flex justify-between gap-10 hover:bg-cyan-300"
                    }
                  >
                    <div className="font-bold">{event.name}</div>
                    <div>
                      <DateFormater value={event.date} dayOfWeek={false} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          {selectedEvent > -1 && (
            <div className="flex flex-col">
              <div className="text-center text-2xl">
                Оберіть роль, в якій ви пропонуєте участь:
              </div>
              <div className="flex justify-center">
                <div className="flex flex-wrap gap-4 p-4">
                  {events![selectedEvent].musiciansNeeded.map(
                    (role: string) => {
                      const currentIndex =
                        events![selectedEvent].musiciansNeeded.indexOf(role);
                      return (
                        <button
                          key={currentIndex}
                          onClick={() => {
                            setSelectedRole(currentIndex);
                          }}
                          className={
                            (currentIndex == selectedRole
                              ? "bg-cyan-500"
                              : "bg-cyan-400") + " p-2 rounded drop-shadow"
                          }
                        >
                          {role}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {selectedRole > -1 && (
          <div className="flex w-full justify-center">
            <form className="flex flex-col gap-4 w-3/4">
              <label>Коментар до запрошення:</label>
              <textarea
                className="h-44 border-2 border-gray-300 rounded"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </form>
          </div>
        )}
        <div className="flex flex-col gap-2 justify-center text-2xl">
          {errorMessages.map((message: string) => {
            return <div className="text-center text-red-500">{message}</div>;
          })}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-400 hover:bg-green-300 disabled:bg-gray-200 disabled:text-gray-400 p-2 rounded drop-shadow"
            disabled={selectedRole == -1 || selectedEvent == -1}
            onClick={() => {
              inviteHandler();
              alert("запрошення було успішно надіслано");
              navigate("/events");
            }}
          >
            надіслати запрошення
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center p-14 gap-8">
        <div className="text-center text-2xl text-red-500">
          у вас нема доступних для запрошення подій
        </div>
        <div className="flex justify-center gap-4">
          <Link
            to={`/event-form`}
            className="bg-cyan-500 hover:bg-cyan-300 rounded drop-shadow p-2"
          >
            Створити нову подію
          </Link>
          <Link
            to={`/user/${receiverId}`}
            className="bg-cyan-500 hover:bg-cyan-300 rounded drop-shadow p-2"
          >
            Назад
          </Link>
        </div>
      </div>
    );
  }
};

export default InvitePage;
