import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../..";
import $api from "../../http";

type LocalParams = {
  commentIndex: number;
  eventId: string;
};

const CommentAdmin = (params: LocalParams) => {
  const { commentIndex, eventId } = params;
  const { store } = useContext(Context);

  const deleteHandler = async () => {
    await $api.delete("/event-comment/" + eventId + "/" + commentIndex);
  };

  if (store.user.login == "ADMIN") {
    return (
      <div>
        <button
          type="button"
          className="bg-red-200 border-2 border-red-400 rounded text-red-400 p-2 hover:bg-red-400 hover:text-white"
          onClick={() => {
            deleteHandler();
            window.location.reload();
          }}
        >
          Видалити
        </button>
      </div>
    );
  } else return <></>;
};

export default observer(CommentAdmin);
