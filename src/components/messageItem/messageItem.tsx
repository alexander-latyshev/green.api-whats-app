import React from "react";
import "./messageItem.css";
import classNames from "classnames";

type Props = {
  type: string;
  text: string;
  timeStamp: number;
};

const MessageItem = (props: Props) => {
  const { type, text, timeStamp } = props;
  const date = new Date(timeStamp * 1000);

  return (
    <div
      className={classNames("message", {
        message_incoming: type === "incoming",
        message_outgoing: type === "outgoing",
      })}
    >
      <span className="message__date">{date.toLocaleString()}</span>
      <span className="message__text">{text}</span>
    </div>
  );
};

export default MessageItem;
