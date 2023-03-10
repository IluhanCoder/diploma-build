import { userInfo } from "os";
import { useContext } from "react";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import { IEvent } from "../../../models/IEvent";
import EventService from "../../../services/EventService";
import { Navigate, useNavigate } from "react-router";

type LocalParams = {
  event: IEvent | undefined;
};

const AdminButtons = (props: LocalParams) => {
  const { event } = props;
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const eventId = event?._id ? event._id : "";

  async function submitHandler() {
    await EventService.submitEvent(eventId);
  }

  async function deleteHandler() {
    await EventService.deleteEvent(eventId);
    navigate("/events");
  }

  if (store.isAuth && store.user.login == "ADMIN") {
    if (!event?.isSubmited) {
      return (
        <div className="bg-white drop-shadow p-3 w-1/3 flex flex-row gap-6 rounded justify-center">
          <button
            onClick={() => {
              submitHandler();
              window.location.reload();
            }}
            type="button"
            className="bg-green-400 hover:bg-green-200 px-2 py-1 rounded drop-shadow"
          >
            Підтвердити
          </button>
          <button
            onClick={() => {
              deleteHandler();
            }}
            type="button"
            className="bg-red-400 hover:bg-red-200 px-2 py-1 rounded drop-shadow"
          >
            Видалити
          </button>
        </div>
      );
    } else {
      return (
        <div className="bg-white drop-shadow p-3 w-1/3 flex flex-row gap-6 rounded justify-center">
          <button
            onClick={() => {
              deleteHandler();
            }}
            type="button"
            className="bg-red-400 hover:bg-red-200 px-2 py-1 rounded drop-shadow"
          >
            Видалити
          </button>
        </div>
      );
    }
  } else return <></>;
};

export default AdminButtons;
