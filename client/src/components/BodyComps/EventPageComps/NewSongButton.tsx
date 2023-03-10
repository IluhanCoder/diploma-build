import { useContext } from "react";
import { Context } from "../../..";
import { Link } from "react-router-dom";

type LocalParams = {
  eventCreatorId: string;
  className?: string;
};

const NewSongButton = (params: LocalParams) => {
  const { store } = useContext(Context);
  if (store.isAuth && store.user._id == params.eventCreatorId) {
    return (
      <Link to="">
        <button type="button" className={params.className}>
          Додати пісню
        </button>
      </Link>
    );
  } else return <></>;
};

export default NewSongButton;
