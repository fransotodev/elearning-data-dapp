import PropTypes from "prop-types";
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

InputElement.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  itemPrepend: PropTypes.node,
  helpText: PropTypes.node,
  extraContent: PropTypes.node,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};
export default InputElement;
