import { useContext, useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { Context } from "../..";
import { IChat } from "../../models/IChat";
import ChatService from "../../services/ChatService";
import { API_URL } from "../../http";
import { BiMessageSquare } from "react-icons/bi";

const ChatsPage = () => {
  const { store } = useContext(Context);
  const [chats, setChats] = useState<IChat[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  let url = API_URL!.replace("/api", "");

  const getData = () => {
    ChatService.getUserChats(store.user._id).then((res) => setChats(res.data));
  };
  useEffect(() => {
    if (store.user._id) getData();
  }, [store.user._id]);

  const containsUnread = (chat: IChat) => {
    return chat.messages.some((message: any) => {
      return message.senderId != store.user._id && !message.read;
    });
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="text-center text-3xl p-2">чати:</div>
      <div className="grid grid-cols-2 gap-2 p-2">
        {chats!.map((chat: IChat) => {
          const receiver =
            chat.user1._id != store.user._id ? chat.user1 : chat.user2;
          return (
            <Link
              to={`/chat/${receiver._id}`}
              className={
                (containsUnread(chat) ? "bg-red-200" : "bg-white") +
                " rounded drop-shadow p-4 flex"
              }
              key={chat._id}
            >
              <div className="row-span-2 w-fit">
                <Avatar
                  src={url + "/" + receiver.avatar}
                  className="rounded"
                  name={receiver.login}
                />
              </div>
              <div className="grow">
                <div className="py-2 px-6 font-bold">{receiver.login}</div>
                <div className="px-10 py-4">
                  {(chat.messages[chat.messages.length - 1].senderId ==
                  store.user._id
                    ? "Ви"
                    : receiver.login) +
                    ": " +
                    chat.messages[chat.messages.length - 1].content}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChatsPage;
