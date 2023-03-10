import { IEvent } from "../../../models/IEvent";
import { Context } from "../../../index";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $api from "../../../http";
import { IUser } from "../../../models/IUser";
import { ITicket } from "../../../models/ITicket";
import UserService from "../../../services/UserService";
import { observer } from "mobx-react-lite";
import PropositionService from "../../../services/PropositionService";
import DateFormater from "../../UniversalComps/DateFormater";
import { getEnvironmentData } from "worker_threads";
import InviteService from "../../../services/InviteService";

type LocalParams = {
  userId: string;
  className?: string;
};

const Invites = ({ userId, className }: LocalParams) => {
  const [invites, setInvites] = useState<ITicket[]>([]);
  const { store } = useContext(Context);

  const getData = () => {
    InviteService.getInvites(store.user._id).then((res) =>
      setInvites(res.data)
    );
  };
  useEffect(() => {
    if (userId) getData();
  }, [userId, setInvites]);

  if (invites) {
    return (
      <div className={className}>
        <div className="flex justify-center h-fit">
          <p className="text-xl">Запоршення на участь в подіях:</p>
        </div>
        {invites.length > 0 && (
          <div className="flex flex-col overflow-auto h-[35rem] gap-2">
            {invites.map((invite: ITicket) => {
              const sender = invite.sender;
              const event = invite.event;
              return (
                <Link to={`/event/${invite.event._id}`} key={invite._id}>
                  <div className="flex-col gap-2 bg-cyan-400 hover:bg-cyan-200 rounded drop-shadow px-3 py-6 text-white ">
                    <div className="flex justify-end">
                      <div>
                        Дата пропозиції:{" "}
                        <DateFormater value={invite.date} dayOfWeek={true} />
                      </div>
                    </div>
                    <div className="flex-wrap p-4">
                      <div className="l">Пропонує: {sender.login}</div>
                      <div className="">
                        Подія: {event.name} (
                        <DateFormater value={event.date} dayOfWeek />)
                      </div>
                      <div className="">Роль: {invite.role}</div>
                    </div>
                    <div className="px-6">{invite.comment}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {invites.length == 0 && (
          <div className="text-center text-gray-400 p-4">Запрошень нема</div>
        )}
      </div>
    );
  } else return <></>;
};

export default observer(Invites);
