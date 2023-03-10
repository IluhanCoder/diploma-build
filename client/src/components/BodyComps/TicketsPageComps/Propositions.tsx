import { useEffect, useState } from "react";
import { ITicket } from "../../../models/ITicket";
import PropositionService from "../../../services/PropositionService";
import { Link } from "react-router-dom";
import DateFormater from "../../UniversalComps/DateFormater";

type LocalParams = {
  userId: string;
  className?: string;
};

const Propositions = ({ userId, className }: LocalParams) => {
  const [propositions, setPropositions] = useState<ITicket[]>();

  const getData = () => {
    PropositionService.getPropositions(userId).then((res) =>
      setPropositions(res.data)
    );
  };
  useEffect(() => {
    if (userId) getData();
  }, [userId]);

  if (propositions) {
    return (
      <div className={className}>
        {console.log(propositions)}
        <div className="flex justify-center h-fit">
          <p className="text-xl">Пропозиції для ваших подій:</p>
        </div>
        {propositions.length > 0 && (
          <div className="flex flex-col overflow-auto h-[35rem] gap-2">
            {propositions.map((proposition: ITicket) => {
              const sender = proposition.sender;
              const event = proposition.event;
              return (
                <Link to={`/user/${sender._id}`} key={proposition._id}>
                  <div className="flex-col gap-2 bg-cyan-400 hover:bg-cyan-200 rounded drop-shadow px-3 py-6 text-white ">
                    <div className="flex justify-end">
                      <div>
                        Дата пропозиції:{" "}
                        <DateFormater
                          value={proposition.date}
                          dayOfWeek={true}
                        />
                      </div>
                    </div>
                    <div className="flex-wrap p-4">
                      <div className="l">Пропонує: {sender.login}</div>
                      <div className="">
                        Подія: {event.name} (
                        <DateFormater value={event.date} dayOfWeek />)
                      </div>
                      <div className="">Роль: {proposition.role}</div>
                    </div>
                    <div className="px-6">{proposition.comment}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {propositions.length == 0 && (
          <div className="text-center text-gray-400 p-4">Запрошень нема</div>
        )}
      </div>
    );
  } else return <></>;
};

export default Propositions;
