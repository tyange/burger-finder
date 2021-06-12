import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context";
import { useHttp } from "../../../hooks/http-hook";

import LoadingDots from "../../UI/LoadingDots/LoadingDots";
import UserInfo from "./UserInfo/UserInfo";
import UserOptions from "./UserOptions/UserOptions";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";

import "./UserProfile.css";

const UserProfile = (props) => {
  const [infoLoading, setInfoLoading] = useState(true);
  const [idToken, setIdToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [nameEditing, setNameEditing] = useState(false);
  const [sendedVerification, setSendedVerification] = useState(false);

  const authContext = useContext(AuthContext);

  const { isLoading, error, initializeError, sendRequest } = useHttp();

  const { url } = useRouteMatch();

  useEffect(() => {
    setIdToken(props.idToken);
    setUserEmail(props.userEmail);
    setUserName(props.userName !== "" ? props.userName : "이름 없음");
    setPhotoUrl(props.photoUrl || null);
    setInfoLoading(false);
  }, [props.idToken, props.userName, props.userEmail, props.photoUrl]);

  const toggleEditMode = () => {
    setNameEditing(!nameEditing);
  };

  const userNameHandle = (event) => {
    const {
      target: { value },
    } = event;

    setUserName(value);
  };

  const emailVerification = async () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    const verifingData = {
      requestType: "VERIFY_EMAIL",
      idToken: idToken,
    };

    try {
      await sendRequest(url, verifingData);
      setSendedVerification(true);
    } catch (err) {
      console.log(err);
    }
  };

  const changeName = async () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    const dataForUpdate = {
      idToken: idToken,
      displayName: userName,
      photoUrl: "",
      deleteAttribute: ["PHOTO_URL"],
      returnSecureToken: true,
    };

    try {
      const responseData = await sendRequest(url, dataForUpdate);
      props.updateProfile(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmError = () => {
    initializeError();
  };

  return (
    <React.Fragment>
      <div className="profile__container">
        {isLoading || infoLoading ? (
          <LoadingDots />
        ) : (
          <React.Fragment>
            <UserInfo
              userEmail={userEmail}
              userName={userName}
              photoUrl={photoUrl}
              nameEditing={nameEditing}
              userNameHandle={userNameHandle}
            />
            <React.Fragment>
              <UserOptions
                sendedVerification={sendedVerification}
                userEmail={userEmail}
                emailVerification={emailVerification}
                toggleEditMode={toggleEditMode}
                nameEditing={nameEditing}
                changeName={changeName}
              />
              <Link className="user-burger__link" to={`${url}/user-burgers`}>
                <button disabled={!authContext.isVerified}>
                  <i className="fas fa-hamburger" />
                  <span>내가 만든 버거</span>
                  <i className="fas fa-hamburger" />
                </button>
              </Link>
            </React.Fragment>
          </React.Fragment>
        )}
      </div>
      <ErrorModal error={error} close={confirmError} />
    </React.Fragment>
  );
};

export default UserProfile;
