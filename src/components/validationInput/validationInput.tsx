import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import "./validationInput.css";
import { useAppDispatch } from "../../redux/hooks";

type Props = {
  type?: string | undefined;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  dispatchValue?: any;
  anotherValue?: any;
  placeholder: string;
};

const ValidationInput = (props: Props) => {
  const { type, value, setValue, placeholder, dispatchValue, anotherValue } =
    props;
  const dispatch = useAppDispatch();
  const inputHandler = (event: any) => {
    if (event.code !== "Enter" || value === "") return;
    dispatchValue ? dispatch(dispatchValue) : anotherValue();
    setValue("");
  };

  return (
    <input
      type="text"
      className={classNames("validation-input", {
        "validation-input_chat": type === "chat",
      })}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => inputHandler(e)}
    />
  );
};

export default ValidationInput;
