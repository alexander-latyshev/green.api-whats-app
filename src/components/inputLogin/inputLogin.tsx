import React, {
  SetStateAction,
  Dispatch,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import "./inputLogin.css";

type Props = {
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

type InputState = {
  message: string;
  error: boolean;
};

const InputLogin = (props: Props) => {
  const { name, value, setValue } = props;
  const [state, setState] = useState<InputState>({
    message: "",
    error: false,
  });

  const changeValueHandler = (value: string) => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "null");
    localStorage.setItem("user",JSON.stringify({ ...storageUser, [name]: value }));
    setValue(value);
    if (!value.trim().length || null) {
      return setState({ ...state, error: true, message: "Empty field" });
    } else {
      return setState({ ...state, error: false, message: "" });
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(null));
  }, []);

  return (
    <div className="Input-login">
      {state.error ? (
        <span className="input-login__error-message">{state.message}</span>
      ) : (
        <span>{name}</span>
      )}
      <input
        className={
          !state.error ? "Input-login__input" : "Input-login__input_error"
        }
        type="text"
        placeholder={`Your ${name}`}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          changeValueHandler(e.target.value)
        }
        value={value}
      />
    </div>
  );
};

export default InputLogin;
