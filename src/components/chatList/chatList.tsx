import React, { useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import "./chatList.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addChat } from "../../redux/reducers/chatSlice";
import ChatItem from "../chatItem/chatItem";
import { IChat } from "../../models/chat";
import { MdAccountCircle } from "react-icons/md";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import ValidationInput from "../validationInput/validationInput";
import { Scrollbar } from "react-scrollbars-custom";

const chatList = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { chats } = useAppSelector((state) => state.chat);
  const idInstance = useAppSelector((state) => state.authorization.account?.idInstance);
  const dispatch = useAppDispatch();

  const addNewChat: IChat = {
    phone: inputValue,
    id: Math.trunc(performance.now() * Math.random() * 1000),
  };

  const addChatHandler = (item: IChat) => {
    if (!item.phone) return;
    dispatch(addChat(item));
    setInputValue("");
  };

  return (
    <div className="chat-list">
      <div className="chat-account">
        <button>
          <FaRegArrowAltCircleLeft size={20} />
        </button>
        <span>{`ID: ${idInstance}`}</span>
        <button>
          <MdAccountCircle size={20} />
        </button>
      </div>

      <div className="chat-form">
        <ValidationInput
          value={inputValue}
          setValue={setInputValue}
          placeholder="Add chat"
          dispatchValue={addChat(addNewChat)}
        />
        <button
          className="chat-form__add-btn"
          onClick={() => addChatHandler(addNewChat)}
        >
          <BiCommentAdd size={30} className="chat-form__add-icon" />
        </button>
      </div>

      <Scrollbar>
        {chats?.map((el, idx) => {
          return <ChatItem name={el.phone} key={idx} id={el.id} />;
        })}
      </Scrollbar>
    </div>
  );
};

export default chatList;
