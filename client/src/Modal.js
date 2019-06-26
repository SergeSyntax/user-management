import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ onDismiss, header, content, options }) => {
  return ReactDOM.createPortal(
    <div className="modal-background" onClick={onDismiss}>
      <div
        className="modal"
        onClick={e => e.stopPropagation()} // to avoid dismissing the page when clicking on the announcement
      >
        <div className="modal-message">
          <h1>{header}</h1>
          <p>{content}</p>
        </div>
        <div>{options}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
