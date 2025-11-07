// src/components/ConfirmModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, title = 'Notice', message = '', onConfirm, onHide }) => {
  return (
    <Modal show={show} centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm || onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
