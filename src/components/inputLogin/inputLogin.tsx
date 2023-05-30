import React, { SetStateAction, Dispatch, ChangeEvent, useEffect } from "react";
import "./inputLogin.css";

type Props = {
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const InputLogin = (props: Props) => {
  const { name, value, setValue } = props;

  const changeValueHandler = (value: string) => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem(
      "user",
      JSON.stringify({ ...storageUser, [name]: value })
    );
    setValue(value);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({}));
  }, []);

  console.log(name);

  return (
    <div className="Input-login">
      <span>{name}</span>
      <input
        className="Input-login__input"
        type="text"
        placeholder={`put your ${name}`}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          return changeValueHandler(e.target.value);
        }}
        value={value}
      />
    </div>
  );
};

export default InputLogin;
