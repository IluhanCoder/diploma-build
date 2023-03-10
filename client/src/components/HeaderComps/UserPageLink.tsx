import { useContext } from "react";
import { Context } from "../..";
import { Link } from "react-router-dom";

const UserPageLink = () => {
  const { store } = useContext(Context);

  if (store.isAuth) {
    return (
      <Link
        to={"user/" + store.user._id}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Сторінка користувача
      </Link>
    );
  } else {
    return <></>;
  }
};

export default UserPageLink;
