export function DeleteButton(props) {
  return (
    <div className="service-editing__delete-button-wrapper d-flex justify-content-end">
      <button
        onClick={props.handleDeleteClick}
        disabled={props.disabled}
        className="service-editing__delete-button"
      >
        Видалити
      </button>
    </div>
  );
}

export function BootstrapInput(props) {
  return (
    <div className="mb-3">
      <label htmlFor={'input-' + props.id} className="form-label">
        {props.title}
      </label>
      <input
        type="text"
        ref={props.inputRef}
        className="form-control"
        id={'input-' + props.id}
        placeholder={props.placeholder}
        defaultValue={props.value}
        onInput={props.checkIfModified}
        required
      />
    </div>
  );
}

export function BootstrapTextarea(props) {
  return (
    <div className="mb-3">
      <label htmlFor={'textarea-' + props.id} className="form-label">
        {props.title}
      </label>
      <textarea
        className="form-control"
        ref={props.inputRef}
        id={'textarea-' + props.id}
        rows="3"
        defaultValue={props.value}
        onInput={props.checkIfModified}
        required
      ></textarea>
    </div>
  );
}

export function FormFooter(props) {
  return (
    <div className="service-editing__buttons-wrapper d-flex justify-content-around">
      <button
        type="button"
        className="btn btn-secondary btn-lg"
        onClick={props.handleClick}
        disabled={props.loading}
      >
        Назад
      </button>

      <SaveButton disabled={props.disabled} loading={props.loading} />
    </div>
  );
}

export function SaveButton(props) {
  return (
    <button
      disabled={props.disabled || props.loading}
      onClick={props.onClick}
      type="submit"
      className={`btn btn-primary btn-lg ${props.stylingClasses || ''}`}
    >
      {props.loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        'Зберегти'
      )}
    </button>
  );
}
