import React from "react";
import ReactDOM from "react-dom";

import BaseCard from "../BaseCard/BaseCard";

import "./BurgerModal.css";

const BurgerModal = (props) => {
  const app = document.getElementById("App");

  if (!props.isOpen) return null;

  return ReactDOM.createPortal(
    <div className="burger__modal-wrapper">
      <div className="burger__modal">
        <div className="burger__modal-inside">
          <BaseCard
            customClassName={`${
              props.cardAnimationClass ? props.cardAnimationClass : ""
            } burger__modal-inside-base-card`}
          >
            {props.myBurger ? (
              <div className="my-burger__modal-text">{props.children}</div>
            ) : (
              <div className="burger__modal-text">
                <span className="burger-ranking-rank">
                  {props.burgerRankText}
                </span>
                <span className="burger-ranking-name">{props.name}</span>
                <span className="burger-ranking-score">
                  ( {props.burgerScoreText} )
                </span>
                {props.urlExtensionBtn}
                {props.urlExtension}
              </div>
            )}
          </BaseCard>
        </div>
      </div>
      <div className="burger__modal-backdrop" onClick={props.closeModal}>
        <button
          className="burger__modal-close-button"
          onClick={props.closeModal}
        >
          <span>❌</span>
        </button>
      </div>
    </div>,
    app
  );
};

export default BurgerModal;