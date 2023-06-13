import React, { useState } from "react";
import "./formAuth.css";
import InputLogin from "../inputLogin/inputLogin";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAuth, setAccount } from "../../redux/reducers/authSlice";
import { IAccount } from "../../models/account";

const FormAuth = () => {
  const [idInstance, setIdInstance] = useState<string>("");
  const [apiTokenInstance, setApiTokenInstance] = useState<string>("");
  const { error, loading, account } = useAppSelector((state) => state.authorization);
  const user: IAccount = JSON.parse(localStorage.getItem("user") || "null");
  const dispatch = useAppDispatch();

  if (!error && !loading && account) return <Navigate to="/account" />;

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

      <div className="form-submit">
        <button
          className="form__submit-btn"
          onClick={() => {
            dispatch(setAccount(user));
            dispatch(fetchAuth(user));
          }}
        >
          Submit
        </button>

        <Link to={"https://green-api.com"}>Register</Link>
      </div>
    </div>
  );
};

export default FormAuth;
