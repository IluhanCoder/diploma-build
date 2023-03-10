import { useContext } from "react";
import { Context } from "../..";
import { Link } from "react-router-dom";

const AdminUsersLink = () => {
  const { store } = useContext(Context);
  if (store.isAuth && store.user.login == "ADMIN")
    return (
      <Link to="/users-admin" className="text-red-400 hover:text-red-200">
        Користувачі
      </Link>
    );
  else return <></>;
};

export default AdminUsersLink;
