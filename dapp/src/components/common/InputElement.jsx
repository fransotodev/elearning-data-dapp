const InputElement = ({
  id,
  labelText,
  type,
  onChange,
  inputValue,
  itemPrepend,
  helpText,
  extraContent,
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={id} className="form-label">
          <strong>{labelText}</strong>
        </label>
        <div className="input-group ">
          <input
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
