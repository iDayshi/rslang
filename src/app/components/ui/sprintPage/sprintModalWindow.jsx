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
          Sprint-game from awesome RSLANG app
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Brief description</h4>
        <p>
          Эта игра помогает сформировать устойчивую нейронную связь между словом
          и его переводом. При наличии таковой ученик рефлекторно, минуя
          гипоталамус, сможет свободно использовать изученные слова в своей
          повседневной речи, что и называется условным рефлексом. Создана под
          руководством замечательного тимлида - Максима и под вдохновением
          полученным от продуктивности и дизайнерских изысков соратницы Маши.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Lets play!</Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalWindow.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func
};

export default ModalWindow;
