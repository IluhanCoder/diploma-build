import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../..";
import UserService from "../../../services/UserService";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

type LocalParams = {
  userId: string;
  className?: string;
};

const AdminButtons = (params: LocalParams) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const { userId, className } = params;

  async function deleteHandler(id: string) {
    await UserService.deleteUserById(id);
    navigate("/users-admin");
  }

  if (store.isAuth && store.user.login == "ADMIN") {
    return (
      <button
        type="button"
        onClick={() => deleteHandler(userId)}
        className={className}
      >
        Видалити
      </button>
    );
  } else return <></>;
};

export default observer(AdminButtons);
