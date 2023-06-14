import React from "react";
import "./main.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthorizationPage from "../../pages/authorization/authorizationPage";
import AccountPage from "../../pages/account/accountPage";

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Navigate to="/authorization" />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </main>
  );
};

export default Main;
