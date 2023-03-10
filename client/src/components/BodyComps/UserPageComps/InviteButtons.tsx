import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../../..";
import UserService from "../../../services/UserService";
import { observer } from "mobx-react-lite";
import PropositionService from "../../../services/PropositionService";
import { ITicket } from "../../../models/ITicket";
import { Link } from "react-router-dom";

type LocalParams = {
  userId: string;
};

const InviteButtons = ({ userId }: LocalParams) => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [proposition, setProposition] = useState<ITicket>();

  const deleteHandler = () => {
    UserService.deleteUserById(userId);
    navigate("/users");
    window.location.reload();
  };

  const getData = () => {
    PropositionService.getProposition(store.user._id, userId).then((res) =>
      setProposition(res.data)
    );
  };
  useEffect(() => {
    if (store.user._id && userId) getData();
  }, [store.user._id, userId]);

  if (store.isAuth && store.user._id != userId) {
    return (
      <div className="flex flex-col gap-3 justify-center bg-white rounded drop-shadow border-1 p-4">
        {(store.user.login == "ADMIN" && (
          <button
            type="button"
            className="rounded bg-red-500 text-white hover:bg-red-700 transition px-4 py-2 hover:text-white lg:mt-0"
            onClick={deleteHandler}
          >
            Видалити
          </button>
        )) ||
          (!proposition && (
            <button
              type="button"
              className="rounded bg-green-500 text-white hover:bg-green-700 transition px-4 py-2 hover:text-white lg:mt-0"
              onClick={() => navigate("/invite/" + userId)}
            >
              Запропонувати участь у події
            </button>
          ))}
        <Link
          to={`/chat/${userId}`}
          className="rounded bg-cyan-400 text-white hover:bg-cyan-200 transition px-4 py-2 hover:text-white lg:mt-0 text-center"
        >
          Надіслати повідомлення
        </Link>
      </div>
    );
  } else return <></>;
};

export default observer(InviteButtons);
