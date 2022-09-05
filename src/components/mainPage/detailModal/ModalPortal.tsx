import React from "react";
import ReactDOM from "react-dom";
import ModalBody from "./ModalBody";

const portal = document.querySelector("#modal_root") as HTMLElement;

function ModalPortal({ handleToggleModal }: { handleToggleModal: () => void }) {
  return ReactDOM.createPortal(
    <ModalBody handleToggleModal={handleToggleModal} />,
    portal
  );
}

export default ModalPortal;
