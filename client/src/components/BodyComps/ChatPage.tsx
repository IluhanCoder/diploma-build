import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../..";
import { IChat } from "../../models/IChat";
import ChatService from "../../services/ChatService";
import DateFormater from "../UniversalComps/DateFormater";
import { FiSend } from "react-icons/fi";

const ChatPage = () => {
  const { receiverId } = useParams<string>();
  const { store } = useContext(Context);
  const [chat, setChat] = useState<IChat>();
  const [message, setMessage] = useState<string>("");

  const newMessageHandler = async () => {
    if (message.length > 0) {
      ChatService.newMessage(message, store.user._id, receiverId!);
      window.location.reload();
    }
  };

  const getData = async () => {
    await ChatService.getChat(store.user._id, receiverId ?? "").then((res) => {
      setChat(res.data);
    });
  };
  useEffect(() => {
    if (receiverId && store.user._id) {
      getData();
    }
  }, [receiverId, store.user._id]);

  return (
    <div className="flex flex-col bg-gray-100 w-full p-10">
      <div className="h-[35rem] overflow-auto flex flex-col gap-2">
        {chat &&
          chat!.messages!.map((message: any) => {
            return (
              <div
                className={
                  "flex px-20 " +
                  (message.senderId == store.user._id ? "flex-row-reverse" : "")
                }
              >
                <div
                  className={
                    "rounded drop-shadow flex flex-col w-2/5 p-4 " +
                    (message.senderId == store.user._id
                      ? "bg-cyan-100"
                      : "bg-white")
                  }
                >
                  <div className="flex flex-row-reverse text-gray-400">
                    <DateFormater value={message.date} dayOfWeek={false} />
                  </div>
                  <div className="text-xl">{message.content}</div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex w-full justify-center p-6">
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="w-2/3 border-2 border-gray-300 rounded h-36 p-4"
        />
        <button type="button" onClick={newMessageHandler}>
          <FiSend className="ml-2" size={35} color="lightblue" />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
