import React, { useContext } from "react";
import { Fragment } from "react";

import Auth from "./components/Auth";
import Ingredients from "./components/Ingredients/Ingredients";
import { AuthContext } from "./context/auth-context";

const App = (props) => {
  const authContext = useContext(AuthContext);
  const toogleLoginHandler = () =>{
    authContext.login()
  }


  let content = <Auth loginHandler={toogleLoginHandler} />;
  if (authContext.isAuth) {
    content = <Ingredients />;
  }
  return <Fragment>{content}</Fragment>;
};

export default App;
