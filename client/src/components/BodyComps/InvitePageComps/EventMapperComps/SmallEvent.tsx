import { IEvent } from "../../../../models/IEvent";
import DateFormater from "../../../UniversalComps/DateFormater";

type LocalParams = {
  event: IEvent;
  isSelected: boolean;
};

const SmallEvent = (params: LocalParams) => {
  const { event, isSelected } = params;
  let bgColor = "";
  if (isSelected) bgColor = "bg-cyan-700";
  else bgColor = "bg-cyan-400";
  return (
    <div
      className={
        "rounded px-16 py-3 text-white grid grid-cols-3 drop-shadow " + bgColor
      }
    >
      <div className="flex">{event.name}</div>
      <div className="flex justify-center">{event.adress}</div>
      <div className="flex right flex-row-reverse">
        <DateFormater value={event.date} dayOfWeek={false} />
      </div>
    </div>
  );
};
export default SmallEvent;
