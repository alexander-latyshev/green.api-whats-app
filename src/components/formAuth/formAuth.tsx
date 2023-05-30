import React, { useState } from "react";
import "./formAuth.css";
import InputLogin from "../inputLogin/inputLogin";
import { useAppDispatch } from "../../redux/hooks";
import { fetchAuthorization, setUser } from "../../redux/reducers/authSlice";

const FormAuth = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const dispatch = useAppDispatch();

  return (
    <div className="form">
      <InputLogin
        name="idInstance"
        value={idInstance}
        setValue={setIdInstance}
      />
      <InputLogin
        name="apiTokenInstance"
        value={apiTokenInstance}
        setValue={setApiTokenInstance}
      />
      <button
        onClick={() => {
          dispatch(setUser(JSON.parse(localStorage.getItem("user") || "{}")));
          dispatch(fetchAuthorization(JSON.parse(localStorage.getItem("user") || "{}")));
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default FormAuth;
