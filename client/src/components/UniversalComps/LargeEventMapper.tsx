import { IEvent } from "../../models/IEvent";
import Event from "../BodyComps/EventsPageComps/Event";

type LocalParams = {
  events: IEvent[];
};

const LargeEventMapper = (params: LocalParams) => {
  const { events } = params;
  if (events?.length == 0)
    return (
      <div className="p-20 w-full">
        <div className="flex justify-center">
          <p className="text-xl text-gray-500">Подій нема</p>
        </div>
      </div>
    );
  else
    return (
      <div className="grid lg:grid-cols-2 md:grid-cols-1 px-5 py-2 gap-4">
        {events?.map((item: IEvent) => {
          return <Event key={item.name} event={item} />;
        })}
      </div>
    );
};

export default LargeEventMapper;
