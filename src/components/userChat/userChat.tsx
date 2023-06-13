import React, { useState, useEffect } from "react";
import "./userChat.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import MessageItem from "../messageItem/messageItem";
import { fetchChatHistory, sendMessage } from "../../redux/reducers/chatSlice";
import ValidationInput from "../validationInput/validationInput";
import { Scrollbar } from "react-scrollbars-custom";
import { IMessageParams } from "../../models/chat";

const UserChat = () => {
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const { history } = useAppSelector((state) => state.chat);
  localStorage.setItem("selected", JSON.stringify(selectedChat));
  const [chatValue, setChatValue] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedChat?.phone) dispatch(fetchChatHistory(selectedChat?.phone));
  }, [selectedChat, selectedChat]);

  const message: IMessageParams = {
    message: chatValue,
    phoneNumber: selectedChat?.phone,
  };

  const sendMessageHandler = async () => {
    await dispatch(sendMessage(message)).then(() => {
      if (selectedChat?.phone) dispatch(fetchChatHistory(selectedChat?.phone));
    });
  };

  if (!selectedChat?.phone) {
    return (
      <div className="chat-empty">
        <h1>WhatsApp Web</h1>
        <span>Send and receive messages!</span>
      </div>
    );
  } else
    return (
      <div className="user-chat">
        <div className="chat-header">
          <h2>{selectedChat?.phone}</h2>
        </div>

        <div className="dialogue-container">
          <Scrollbar>
            {history?.map((mes, idx) => {
              return (
                <MessageItem
                  type={mes.type}
                  text={mes.textMessage}
                  key={idx}
                  timeStamp={mes.timestamp}
                />
              );
            })}
          </Scrollbar>
        </div>

        <div className="chat-wrapper">
          <ValidationInput
            value={chatValue}
            setValue={setChatValue}
            anotherValue={sendMessageHandler}
            placeholder="Enter your message"
            type="chat"
          />
        </div>
      </div>
    );
};

export default UserChat;
