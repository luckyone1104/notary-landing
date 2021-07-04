import { useState } from 'react';

export default function Modal(props) {
  const [loading, setLoading] = useState(false);
  if (!props.modal) return null;

  return (
    <div
      className="modal fade"
      id={props.modal.id || 'modal'}
      tabIndex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              {props.modal.title}
            </h5>
            <button
              disabled={loading}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{props.modal.text}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              disabled={loading}
            >
              {props.modal.firstButtonTitle}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={e => {
                setLoading(true);
                props.modal.clickOnSecondButton(e);
              }}
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                props.modal.secondButtonTitle
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
