import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import UserProfile from "./UserProfile/UserProfile";
import UserBurgers from "./UserBurgers/UserBurgers";
import ResetPassword from "../Auth/ResetPassword/ResetPassword";
import DeleteAccount from "./UserProfile/UserOptions/DeleteAccount/DeleteAccount";

const User = (props) => {
  const { path } = useRouteMatch();

  return (
    <div className="find-hamburger__user">
      <Switch>
        <Route exact path={path}>
          <UserProfile
            userEmail={props.userEmail}
            userName={props.userName}
            idToken={props.idToken}
            updateProfile={props.updateProfile}
          />
        </Route>
        <Route path={`${path}/user-burgers`}>
          <UserBurgers userId={props.userId} idToken={props.idToken} />
        </Route>
        <Route path={`${path}/reset-password`}>
          <ResetPassword notLoggedIn={false} userEmail={props.userEmail} />
        </Route>
        <Route path={`${path}/delete-account`}>
          <DeleteAccount
            userEmail={props.userEmail}
            idToken={props.idToken}
            logout={props.logout}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default User;
