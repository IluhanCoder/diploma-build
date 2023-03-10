import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../../..";
import { IEvent, IParticipant } from "../../../models/IEvent";
import { ITicket } from "../../../models/ITicket";
import InviteService from "../../../services/InviteService";
import PropositionService from "../../../services/PropositionService";

type LocalParams = {
  event: IEvent;
};

const PropositionButton = ({ event }: LocalParams) => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [proposition, setProposition] = useState<ITicket>();
  const [invite, setInvite] = useState<ITicket>();
  const [checked, setChecked] = useState<boolean>(false);

  const proposeHandler = () => {
    navigate(`/event-proposition/${event?._id}`);
  };

  const checkConditions = () => {
    setChecked(
      event &&
        event?.musiciansNeeded.length > 0 &&
        !event?.participants.some(
          (participant: IParticipant) => participant._id == store.user._id
        ) &&
        event!.creator._id != store.user._id &&
        !proposition &&
        !invite
    );
  };

  const getData = () => {
    PropositionService.getProposition(event.creator._id, store.user._id).then(
      (res) => {
        setProposition(res.data);
      }
    );
    InviteService.getInvite(store.user._id, event._id).then((res) => {
      setInvite(res.data);
    });
  };
  useEffect(() => {
    if (store.user._id && event) {
      getData();
    }
  }, [store.user._id, event]);

  useEffect(() => {
    checkConditions();
  }, [proposition, invite]);

  if (checked)
    return (
      <div className="bg-white drop-shadow rounded p-2 flex justify-center col-start-2">
        <button
          type="button"
          className="bg-cyan-400 hover:bg-cyan-300 rounded p-2"
          onClick={proposeHandler}
        >
          запропонувати свою участь
        </button>
      </div>
    );
  else if (proposition)
    return (
      <div className="col-span-3 bg-yellow-200 border-2 border-yellow-500 text-yellow-500 p-4 rounded text-xl drop-shadow text-center">
        ви надіслали пропозицію на вашу участь в ролі <b>{proposition.role}</b>
      </div>
    );
  else return <></>;
};

export default PropositionButton;
