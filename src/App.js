import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import Home from "./components/Home/Home";
import Burger from "./components/Burger/Burger";
import Credits from "./components/Credits/Credits";
import Auth from "./components/Auth/Auth";
import Layout from "./components/Layout/Layout";
import User from "./components/User/User";

const App = () => {
  const {
    idToken,
    userName,
    userEmail,
    userId,
    isLoggedIn,
    isVerified,
    login,
    updateProfile,
    logout,
  } = useAuth();

  let routes = (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/burger-maker">
        <Burger userId={userId} idToken={idToken} />
      </Route>
      <Route path="/credits" exact>
        <Credits />
      </Route>
      {isLoggedIn && (
        <Route path="/users/:userId">
          <User
            idToken={idToken}
            userId={userId}
            userName={userName}
            userEmail={userEmail}
            updateProfile={updateProfile}
            logout={logout}
          />
        </Route>
      )}
      <Route path="/auth">
        <Auth login={login} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App" id="App">
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, isVerified: isVerified }}
      >
        <Layout userName={userName} userId={userId} logout={logout}>
          {routes}
        </Layout>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
