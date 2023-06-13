import React from "react";
import ChatList from "../../components/chatList/chatList";
import UserChat from "../../components/userChat/userChat";
import "./accountPage.css";

const AccountPage = () => {
  return (
    <section className="account-page">
      <ChatList />
      <UserChat />
    </section>
  );
};

export default AccountPage;
