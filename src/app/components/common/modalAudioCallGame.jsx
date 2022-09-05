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
          Аудиовызов
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Как играть </h5>
        <p>Необходимо отгадать максимальное количество озвученных слов.</p>
        <p>Для ответа кликайте мышкой по слову, которое считаете правильным,
          либо используйте цифры 1 - 5 на клавиатуре.</p>
        <p>Чтобы пропустить слово, используйте пробел.</p>
        <p>Чтобы перейти к следующему вопросу, нажмите
          «Enter».</p>
        <p>Для повтора озвученного слова кликните по самой большой
          круглой кнопке. Маленькая круглая кнопка озвучит пример, в котором
          присутствует слово. </p>
        <p>Успехов!</p>
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
