import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { useContext } from "react";
import Invites from "./TicketsPageComps/Invites";
import Propositions from "./TicketsPageComps/Propositions";

const TicketsPage = () => {
  const { store } = useContext(Context);
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100">
      <div className="text-center text-3xl">Пропозиції для вас:</div>
      <div className="grid grid-cols-2 gap-4">
        <Propositions
          userId={store.user._id}
          className="bg-white rounded drop-shadow p-4 flex flex-col gap-4"
        />
        <Invites
          userId={store.user._id}
          className="bg-white rounded drop-shadow p-4 flex flex-col gap-4"
        />
      </div>
    </div>
  );
};

export default observer(TicketsPage);
