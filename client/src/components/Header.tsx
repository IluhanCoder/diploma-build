import "../index.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RightButtons from "./HeaderComps/AccountButtons";
import { observer } from "mobx-react-lite";
import UserPageLink from "./HeaderComps/UserPageLink";
import { storeAnnotation } from "mobx/dist/internal";
import { Context } from "../index";
import AdminUsersLink from "./HeaderComps/AdminUsersLink";
import ChatService from "../services/ChatService";

function Header() {
  const { store } = useContext(Context);

  const [unreadMessagesCount, setUnreadMessagesCount] = useState<Number>(0);

  const getData = () => {
    ChatService.getUnreadCount(store.user._id).then((res) => {
      console.log(res.data);
      setUnreadMessagesCount(res.data.unreadCount);
    });
  };
  useEffect(() => {
    if (store.user._id) getData();
  }, [store.user._id]);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-cyan-500 to-sky-500 p-4 drop-shadow-lg">
        <div className="flex items-center gap-10 text-white">
          <span className="font-bold text-xl tracking-tight hidden md:flex">
            Music WEB
          </span>
          <div className="flex gap-4 md:gap-5 text-xl md:text-base">
            {store.isAuth && store.user.login != "ADMIN" && (
              <div className="hover:text-gray-300">
                <Link to={"/user-events"}>мої події</Link>
              </div>
            )}
            {store.isAuth && store.user.login != "ADMIN" && (
              <div className="hover:text-gray-300">
                <Link to={`/user/${store.user._id}`}>моя сторінка</Link>
              </div>
            )}
            {store.isAuth && store.user.login != "ADMIN" && (
              <div className="hover:text-gray-300">
                <Link to={`/tickets`}>пропозиції</Link>
              </div>
            )}
            <div className="hover:text-gray-300">
              <Link to={`/events`}>події</Link>
            </div>
            <div className="hover:text-gray-300">
              <Link to={`/users`}>користувачі</Link>
            </div>
            {store.isAuth && store.user.login != "ADMIN" && (
              <div className="hover:text-gray-300">
                <Link to={`/chats`}>
                  <div className="flex gap-2">
                    чати
                    {unreadMessagesCount > 0 && (
                      <div className="bg-red-400 rounded-full px-2 py-0.5 text-sm">
                        {unreadMessagesCount}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <RightButtons />
        </div>
      </nav>
    </>
  );
}

export default observer(Header);
