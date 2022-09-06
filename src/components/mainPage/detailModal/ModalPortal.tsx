import React from "react";
import ReactDOM from "react-dom";
import ModalBody from "./ModalBody";

const portal = document.querySelector("#modal_root") as HTMLElement;

function ModalPortal({
  handleToggleModal,
  postId,
}: {
  handleToggleModal: () => void;
  postId: number;
}) {
  return ReactDOM.createPortal(
    <ModalBody handleToggleModal={handleToggleModal} postId={postId} />,
    portal
  );
}

export default ModalPortal;
