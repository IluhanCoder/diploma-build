import { useState } from "react";
import { IEvent } from "../../../models/IEvent";
import DateFormater from "../../UniversalComps/DateFormater";
import SmallEvent from "./EventMapperComps/SmallEvent";

type LocalParams = {
  events: Array<IEvent>;
  chosenIndex: number;
  setChosenIndex: React.Dispatch<React.SetStateAction<number>>;
};

const EventsMapper = (params: LocalParams) => {
  const { events, chosenIndex, setChosenIndex } = params;

  return (
    <div className="flex flex-col gap-2">
      {events?.map((event: IEvent) => {
        const currentIndex = events.indexOf(event);
        return (
          <button type="button" onClick={() => setChosenIndex(currentIndex)}>
            <SmallEvent
              event={event}
              isSelected={chosenIndex == currentIndex ? true : false}
            />
          </button>
        );
      })}
    </div>
  );
};

export default EventsMapper;
