import React from "react";
import NotMessageTinder from "./NotMessageTinder/NotMessageTinder";
import { useState } from "react";
import HaveMessageTinder from "./HaveMessageTinder/HaveMessageTinder";

const MessageTinder = () => {
  const [haveMessage, setHaveMassagte] = useState("hi");
  return (
    <div>{haveMessage ? <HaveMessageTinder /> : <NotMessageTinder />}</div>
  );
};

export default MessageTinder;
