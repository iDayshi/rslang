import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

function ModalWindow({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Игра Бла бла бла
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Бла бла бла </h4>
        <p>Паиграйте в маю игру</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalWindow.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func
};

export default ModalWindow;
