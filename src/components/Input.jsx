import { createEffect, createSignal } from "solid-js";

function Input(props) {
  const timeNow = new Date();
  const { label, placeHolder, setPropType } = props;
  const [error, setError] = createSignal('');
  const [tempVal, setTempVal] = createSignal(0);

  createEffect(() => {
    if (!error() || error() === '') {
      setPropType(tempVal());
    } else {
      setPropType(null);
    }
  });

  const validate = () => {
    if (tempVal() === 0 || tempVal().toString() === '') {
      setError('This field is required');
    }
  };

  const validateOut = () => {
    if (label === 'DAY') {
      if (isNaN(tempVal()) || tempVal() < 1 || tempVal() > 31) {
        setError('Must be a valid Day');
      } else {
        setError('');
      }
    }
    if (label === 'MONTH') {
      if (isNaN(tempVal()) || tempVal() < 1 || tempVal() > 12) {
        setError('Must be a valid month');
      } else {
        setError('');
      }
    }
    if (label === 'YEAR') {
      if (isNaN(tempVal()) || tempVal() <= 0) {
        setError('Must be a valid year');
      } else if (tempVal() > timeNow.getFullYear()) {
        setError('Must be in the past');
      } else {
        setError('');
      }
    }
    // const validDate = new Date(days(),months(),years())
  };

  const getClassName = () => {
    return error() ? "input-error" : "";
  };

  return (
    <div>
      <label for={label} class={getClassName()}>
        {label}
      </label>
      <input
        type="number"
        name={label}
        id={label}
        onInput={(e) => {
          setTempVal(e.target.value);
          validateOut();
        }}
        placeholder={placeHolder}
        onFocusOut={() => validate()}
        class={getClassName()}
      />
      {error && <small>{error()}</small>}
    </div>
  );
}

export default Input;
