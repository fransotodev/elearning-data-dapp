const InputElement = ({
  id,
  labelText,
  type,
  onChange,
  inputValue,
  itemPrepend,
  helpText,
  extraContent,
  error,
  disabled = false,
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={id} className="form-label">
          <strong>{labelText}</strong>
        </label>
        <div className="input-group ">
          <input
            disabled={disabled}
            type={type}
            className="form-control "
            id={id}
            onChange={onChange}
            value={inputValue}
          />

          {itemPrepend && (
            <div className="input-group-prepend">{itemPrepend}</div>
          )}
        </div>
        {error && <div className="alert alert-danger">{error}</div>}

        {helpText && (
          <div id={`${id}Help`} className="form-text text-muted">
            {helpText}
          </div>
        )}

        {extraContent}
      </div>
    </>
  );
};

export default InputElement;
