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
          Учебник RSLang
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Как пользоваться учебником </h5>
        <p>В учебнике 6 разделов для изучения новых слов в соответствии с уровнем сложности.
          Седьмой раздел учебника включает сложные слова, - список этих слов составляется пользователем.
          Карточка каждого слова показывает написание слова на английском языке, транскрипцию и перевод,
          а для более глубокого понимания каждого слова приводится пример на английском языке с переводом:</p>
        <div className="dictionary-about"></div>
        <p className="dictionary-description">1 - изображение слова</p>
        <p className="dictionary-description">2 - написание слова</p>
        <p className="dictionary-description">3 - транскрипция слова</p>
        <p className="dictionary-description">4 - перевод слова на русский язык</p>
        <p className="dictionary-description">5 - количество правильный ответов для слова в играх</p>
        <p className="dictionary-description">6 - количество неверных ответов для слова в играх</p>
        <p className="dictionary-description">7 - прогресс изучения слова</p>
        <p className="dictionary-description">8 - пример предложения с употреблением слова и перевод</p>
        <p className="dictionary-description">9 - определение слова на английском и русском языках</p>
        <p className="dictionary-description">10 - кнопка добавления слова в список сложных</p>
        <p className="dictionary-description">11 - кнопка воспроизведения - последовательно озвучиваются слово, пример и определние</p>
        <p>12 - кнопка добавления слова в список изученных</p>
        <p>Карточка сложного слова подсвечивается красным цветом, карточка изученного слова подсвечивается зеленым цветом.</p>
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
