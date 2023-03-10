import { useContext, useEffect, useState } from "react";
import { idText } from "typescript";
import { ITicket } from "../../../models/ITicket";
import InviteService from "../../../services/InviteService";
import { Context } from "../../../index";
import { useNavigate } from "react-router";

type LocalParams = {
  className?: string;
  eventId: string;
};

const AcceptInviteButton = ({ eventId, className }: LocalParams) => {
  const [invite, setInvite] = useState<ITicket>();
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const acceptHandler = () => {
    InviteService.acceptInvite(invite?._id!);
    window.location.reload();
  };
  const rejectHandler = () => {
    InviteService.rejectInvite(invite?._id!);
    navigate(`/events`);
  };

  const getData = () => {
    InviteService.getInvite(store.user._id, eventId).then((res) =>
      setInvite(res.data)
    );
  };
  useEffect(() => {
    if (store.user._id && eventId) getData();
  }, [store.user._id, eventId]);

  if (invite) {
    return (
      <div className={className}>
        <button
          type="button"
          className="bg-green-400 hover:bg-green-300 rounded p-2 drop-shadow"
          onClick={() => acceptHandler()}
        >
          погодитись
        </button>
        <button
          type="button"
          className="bg-red-400 hover:bg-red-300 rounded p-2 drop-shadow"
          onClick={() => {
            rejectHandler();
          }}
        >
          відмовитись
        </button>
      </div>
    );
  } else return <></>;
};

export default AcceptInviteButton;
