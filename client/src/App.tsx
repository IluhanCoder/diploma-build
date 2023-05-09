import React, { useEffect, useContext, FC } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import Header from "./components/Header";
import Body from "./components/Body";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";

const App: FC = () => {
  const { store } = useContext(Context);

  const authConfirm = async () => {
    if (localStorage.getItem("token")) {
      await store.checkAuth();
    }
  };

  useEffect(() => {
    authConfirm();
  }, [store.isAuth]);

  return (
    <Router>
      <Header />
      <Body />
    </Router>
  );
};

export default observer(App);
