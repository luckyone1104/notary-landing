import React from 'react';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Loading from './Loading.jsx';

export default React.memo(function BootstrapModal(props) {
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      centered
    >
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      {props.body ? <Modal.Body>{props.body}</Modal.Body> : null}

      <Modal.Footer>
        <Button
          disabled={loading}
          variant="secondary"
          onClick={props.handleClose}
        >
          {props.firstButtonTitle || 'Ні'}
        </Button>
        <Button
          onClick={() => {
            setLoading(true);
            props.clickOnSecondButton();
          }}
          disabled={loading}
          variant="primary"
        >
          {loading ? <Loading /> : props.secondButtonTitle || 'Так'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
