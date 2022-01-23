import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Block } from "baseui/block";
import HeaderComponent from "../components/app-nav-bar/HeaderComponent";
import IngresoCreate from "../pages/Recivos/IngresoCreate";
import IngresoDataTable from "../pages/Tablet/IngresoDataTable";
import NotFound from "../pages/NotFound/NotFound";
import IngresoUpdate from "../pages/Recivos/IngresoUpdate";
import flex from "../pages/flex/flex";
import Login from "../pages/Login/Login";
import Cookies from "universal-cookie";
import { URI_DOMAIN } from "../constants/constants";
import axios from "axios";

const Routes = () => {
  const [idUser, setIdUser] = useState("");
  const [isLoging, setIsLogin] = useState(true);
  const cookies = new Cookies();

  const peticionGet = async () => {
    setIdUser(cookies.get("accessToken"))
    console.log(URI_DOMAIN + "/usuario/" + idUser)
    await axios
      .get(URI_DOMAIN + "/usuario/" + idUser)
      .then((response) => {
        setIsLogin(false)
      })
      .catch((error) => {
      });
  };
  useEffect(() => {
    peticionGet();
  }, [idUser]);
  if (isLoging) {
    return <Login />;
  }
  return (
    <BrowserRouter>
      <Block
        height={"100vh"}
        display={"flex"}
        flexDirection={"column"}
        backgroundColor={"black"}
      >
        <HeaderComponent />
        <Switch>
          <Route exact path="/" component={IngresoCreate} />
          <Route exact path="/home" component={IngresoCreate} />
          <Route exact path="/registrar" component={IngresoCreate} />
          <Route exact path="/table" component={IngresoDataTable} />
          <Route exact path="/table/:id" component={IngresoUpdate} />
          <Route exact path="/flex" component={flex} />
          <Route component={NotFound} />
        </Switch>
      </Block>
    </BrowserRouter>
  );
};

export default Routes;
