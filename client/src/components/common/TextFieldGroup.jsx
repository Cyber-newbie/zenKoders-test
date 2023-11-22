import { forwardRef } from "react";
import classnames from "classnames";

const TextFieldGroup = forwardRef((props, ref) => {
  return (
    <div className="mb-4">
      <input
        type={props.type}
        className={classnames("border rounded-3xl border-gray-300 p-2 w-full", {
          "border-red-500": props.error,
        })}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        disabled={props.disabled}
        ref={ref}
        defaultValue={props.defaultValue}
      />
      {props.info && (
        <small className="text-gray-500 text-xs">{props.info}</small>
      )}
      {props.error && (
        <div className="text-red-500 text-xs mt-1">{props.error}</div>
      )}
    </div>
  );
});

export default TextFieldGroup;
