import { generateKeySync } from "crypto";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IEvent, IParticipant } from "../../../models/IEvent";
import EventService from "../../../services/EventService";
import DateFormater from "../../UniversalComps/DateFormater";

type LocalParams = {
  userId: string;
};

const History = ({ userId }: LocalParams) => {
  const [events, setEvents] = useState<IEvent[]>();

  const getData = () => {
    if(userId !== undefined) EventService.getUserEvents(userId!).then((res) => setEvents(res.data));
  };
  useEffect(() => getData(), [userId]);

  return (
    <div className="flex gap-2 w-full">
      <div className="bg-white rounded drop-shadow w-1/2 p-4 flex flex-col gap-2">
        <div className="text-center text-xl flex flex-col gap-2">
          історія подій:
        </div>
        <div className="overflow-auto h-72">
          <div className="flex flex-col gap-4">
            {events
              ?.filter((event: IEvent) => {
                const currentDate = new Date();
                const tempDate = new Date(event.date);
                return tempDate.getTime() < currentDate.getTime();
              })
              .map((event: IEvent) => {
                return (
                  <Link
                    to={`/event/${event._id}`}
                    className="bg-cyan-400 hover:bg-cyan-200 rounded drop-shadow px-6 py-4 flex flex-col gap-2"
                    key={event._id}
                  >
                    <div className="flex justify-center font-bold">
                      {event.name}
                    </div>
                    <div className="grid grid-cols-2">
                      <div>
                        Pоль:{" "}
                        {event.creator._id == userId
                          ? "творець"
                          : event.participants.filter((participant: any) => {
                              return participant.id == userId;
                            })[0]?.role}
                      </div>
                      <div>
                        Дата:{" "}
                        <DateFormater value={event.date} dayOfWeek={false} />
                      </div>
                      <div className="flex gap-2">
                        <div>Жанри:</div>
                        <div className="flex flex-wrap gap-2">
                          {event.genres.map((genre: string) => {
                            return <div>{genre}</div>;
                          })}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div>Адреса:</div>
                        <div>{event.adress}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
      <div className="bg-white rounded drop-shadow w-1/2 p-4 flex flex-col gap-2">
        <div className="text-center text-xl">майбутні події:</div>
        <div className="overflow-auto h-72">
          <div className="flex flex-col gap-4">
            {events
              ?.filter((event: IEvent) => {
                const currentDate = new Date();
                const tempDate = new Date(event.date);
                return tempDate.getTime() >= currentDate.getTime();
              })
              .map((event: IEvent) => {
                return (
                  <Link
                    to={`/event/${event._id}`}
                    className="bg-cyan-400 hover:bg-cyan-200 rounded drop-shadow px-6 py-4 flex flex-col gap-2"
                    key={event._id}
                  >
                    <div className="flex justify-center font-bold">
                      {event.name}
                    </div>
                    <div className="grid grid-cols-2">
                      <div>
                        Pоль:{" "}
                        {event.creator._id == userId
                          ? "творець"
                          : event.participants.filter((participant: any) => {
                              return participant.id == userId;
                            })[0]?.role}
                      </div>
                      <div>
                        Дата:{" "}
                        <DateFormater value={event.date} dayOfWeek={false} />
                      </div>
                      <div className="flex gap-2">
                        <div>Жанри:</div>
                        <div className="flex flex-wrap">
                          {event.genres.map((genre: string) => {
                            return <div>{genre}</div>;
                          })}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div>Адреса:</div>
                        <div>{event.adress}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
