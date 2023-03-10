import { IEvent } from "../../models/IEvent";
import { Link } from "react-router-dom";
import DateFormater from "./DateFormater";
import { observer } from "mobx-react-lite";

type LocalParams = {
  events: IEvent[];
  blockClassName?: string;
};

const defaultClassName =
  "bg-cyan-400 hover:bg-cyan-200 text-white rounded drop-shadow gap-2";

const SmallEventMapper = (params: LocalParams) => {
  const { events, blockClassName } = params;
  if (events)
    return (
      <div>
        {events.map((event: IEvent) => {
          return (
            <div
              className={blockClassName ?? defaultClassName + " flex flex-col"}
            >
              <div className="flex justify-end">
                <div>
                  Створив подію:{" "}
                  <Link to={"/user/" + event.creator._id}>
                    {event.creator.login}
                  </Link>
                </div>
              </div>
              <div className="flex justify-center text-xl">{event.name}</div>
              <div className="flex flex-col">
                <div>Адреса: {event.adress}</div>
                <div>
                  Дата проведення: <DateFormater value={event.date} dayOfWeek />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  else return <></>;
};

export default observer(SmallEventMapper);
