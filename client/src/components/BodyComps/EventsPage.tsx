import React, { useContext, useState } from "react";
import { IEvent, IParticipant } from "../../models/IEvent";
import EventsMapper from "../UniversalComps/LargeEventMapper";
import { Context } from "../..";
import UserService from "../../services/UserService";
import { observer } from "mobx-react-lite";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import EventService from "../../services/EventService";
import { AxiosResponse } from "axios";

type LocalParams = {
  type: string;
};

//function display different data depending on the "type" parameter:
// "submited" - displays all of submited events
// "unsubmited" - displays all of unsubmited events
// "user" - displays current user's (from context) events
export const Events = ({ type }: LocalParams) => {
  const { store } = useContext(Context);

  const [events, setEvents] = useState<IEvent[]>([]);
  //getData function sends API request depending on type param
  const getData = async (type: string) => {
    let res: Promise<AxiosResponse<IEvent[]>>;
    switch (type) {
      case "submited":
        await EventService.getEvents(true).then((res) => setEvents(res.data));
        break;
      case "unsubmited":
        await EventService.getEvents(false).then((res) => setEvents(res.data));
        break;
      case "user":
        await EventService.getUserEvents(store.user._id).then((res) =>
          setEvents(res.data)
        );
        break;
    }
  };
  React.useEffect(() => {
    if (type && (store.user._id || type != "user")) getData(type);
  }, [type, store.user._id]);

  //filterEvents funciton handling searching process depending
  //on searchType (user chooses it via HTML <select/>)
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("name");
  const filterEvents = (events: IEvent[]) => {
    return events.filter((event: IEvent) => {
      if (searchValue.length > 0) {
        const upperValue = searchValue.toUpperCase();
        switch (searchType) {
          case "name":
            return event.name.toUpperCase().includes(upperValue);
          case "city":
            return event.adress.toUpperCase().includes(upperValue);
          case "participant":
            return event.participants.some((participant: IParticipant) => {
              if (participant.name.toUpperCase().includes(upperValue)) {
                return true;
              }
            });
          case "genre":
            return event.genres.some((str: string) => {
              if (str.toUpperCase().includes(upperValue)) {
                return true;
              }
            });
          case "creator":
            return event.creator.login.toUpperCase().includes(upperValue);
        }
      } else return true;
    });
  };

  return (
    <div className="bg-gray-100 flex flex-col h-[49.25rem]">
      <div className="flex md:justify-between md:flex-row-reverse flex-col items-center gap-5 bg-gray-200 py-2 px-5 drop-shadow">
        <div className="flex gap-3">
          <input
            type="text"
            className="rounded drop-shadow"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="py-1 pr-6 pl-1 rounded drop-shadow"
          >
            <option value="name">по назві</option>
            <option value="city">за адресою</option>
            <option value="participant">по учасниках</option>
            <option value="creator">по творцю</option>
            <option value="genre">по жанрах</option>
          </select>
        </div>
        {store.isAuth && type != "unsubmited" && (
          <Link to="/event-form">
            <button className="bg-green-400 text-white rounded px-4 h-8 hover:bg-green-200 drop-shadow">
              Створити свою подію
            </button>
          </Link>
        )}
      </div>

      {type == "submited" && UserService.isAdmin(store.user._id) && (
        <div className="flex justify-center py-4">
          <Link to={"/events-admin"} className="w-fit">
            <div className="text-center rounded px-2 py-1 border-4 border-red-500 bg-red-300 text-red-500 hover:bg-red-200 hover:text-red-300 hover:border-red-300">
              Запити на створення подій
            </div>
          </Link>
        </div>
      )}
      {type == "user" && (
        <div className="flex justify-center ">
          <p className="text-3xl p-2">Ваші події:</p>
        </div>
      )}

      <div className="grow overflow-auto">
        <EventsMapper events={filterEvents(events)} />
      </div>
    </div>
  );
};

export default observer(Events);
