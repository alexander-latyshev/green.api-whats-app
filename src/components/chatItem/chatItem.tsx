import React from "react";
import "./chatItem.css";
import { MdDelete } from "react-icons/md";
import { useAppDispatch } from "../../redux/hooks";
import { removeChat, selectChat } from "../../redux/reducers/chatSlice";

type Props = {
  name: string;
  id: number;
};

const ChatItem = (props: Props) => {
  const dispatch = useAppDispatch();
  const { name, id } = props;

  return (
    <div className="chat-item" onClick={() => dispatch(selectChat(id))}>
      <span>{name}</span>
      <button
        className="chat-item__remove-btn"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(removeChat(id));
        }}
      >
        <MdDelete className="chat-item__remove-icon" />
      </button>
    </div>
  );
};

export default ChatItem;
