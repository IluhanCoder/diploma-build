import { useContext, useEffect, useState } from "react";
import { idText } from "typescript";
import { ITicket } from "../../../models/ITicket";
import InviteService from "../../../services/InviteService";
import { Context } from "../../../index";
import { useNavigate } from "react-router";
import PropositionService from "../../../services/PropositionService";
import { Link } from "react-router-dom";

type LocalParams = {
  className?: string;
  userId: string;
};

const AcceptPropositionButton = ({ userId, className }: LocalParams) => {
  const [proposition, setProposition] = useState<ITicket>();
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const acceptHandler = () => {
    PropositionService.acceptProposition(proposition?._id!);
    window.location.reload();
  };
  const rejectHandler = () => {
    PropositionService.rejectProposition(proposition?._id!);
    navigate(`/events`);
  };

  const getData = () => {
    PropositionService.getProposition(store.user._id, userId).then((res) =>
      setProposition(res.data)
    );
  };
  useEffect(() => {
    if (store.user._id && userId) getData();
  }, [store.user._id, userId]);

  if (proposition) {
    return (
      <div className={className}>
        <div className="text-center pb-2">
          даний користувач надіслав запрос на участь в події <br />
          <Link
            to={`/event/${proposition.event._id}`}
            className="font-bold underline"
          >
            {proposition.event.name}
          </Link>
        </div>
        <button
          type="button"
          className="bg-green-400 hover:bg-green-300 rounded p-2 drop-shadow"
          onClick={() => acceptHandler()}
        >
          погодитись на пропозицію
        </button>
        <button
          type="button"
          className="bg-red-400 hover:bg-red-300 rounded p-2 drop-shadow"
          onClick={() => {
            rejectHandler();
          }}
        >
          відмовитись від пропозиції
        </button>
      </div>
    );
  } else return <></>;
};

export default AcceptPropositionButton;
