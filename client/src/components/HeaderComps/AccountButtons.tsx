import React, { FC, useContext, useState } from "react";
import { Context } from "../../index";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

export const RightButtons: FC = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  async function logoutHandler() {
    await store.logout();
    navigate("/login");
  }

  if (!store.isAuth) {
    return (
      <>
        <div className="flex-grow-3">
          <Link
            to="/login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Вхід
          </Link>
          <Link
            to="/reg"
            className="inline-block text-sm px-4 ml-3 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Реєстрація
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <a href="../profile" className="px-8 text-white">
          <u>{store.user.login}</u>
        </a>
        <Link
          to="#"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          onClick={() => logoutHandler()}
        >
          Вийти
        </Link>
      </div>
    </>
  );
};

export default observer(RightButtons);
