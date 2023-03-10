import { storeAnnotation } from "mobx/dist/internal";
import { useNavigate } from "react-router";
import { IEvent } from "../../../models/IEvent";
import UserService from "../../../services/UserService";
import { Context } from "../../..";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import EventService from "../../../services/EventService";

type LocalParams = {
  eventId: string;
};

const ProposeButtons = ({ eventId }: LocalParams) => {
  const [event, setEvent] = useState<IEvent>();
  const navigate = useNavigate();
  const { store } = useContext(Context);

  function proposeHandler(eventId: string) {
    navigate("/event-proposition/" + eventId);
  }

  const getData = async () => {
    EventService.getEvent(eventId).then((res) => {
      setEvent(res.data);
    });
  };
  useEffect(() => {
    if (eventId) getData();
  }, [eventId]);

  if (store.user._id != event?.creator._id && event!.roles.length > 0) {
    return (
      <div className="rounded bg-white flex justify-center p-4 drop-shadow w-1/3">
        <button
          className="bg-green-400 hover:bg-green-300 rounded p-2"
          onClick={() => proposeHandler(event!._id)}
        >
          Запропонувати свою участь
        </button>
      </div>
    );
  } else return <></>;
};

export default observer(ProposeButtons);
