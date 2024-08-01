import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
  padding-bottom: 100px; /* Adjust based on the height of your input container */
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #f1f1f1;
`;

const InputContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const EditableDiv = styled.div`
  width: 100%;
  height: auto;
  max-height: 473px; /* Maximum height */
  overflow-y: auto; /* Enable scrolling if content exceeds max height */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
`;

const Test = () => {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInput = (e) => {
    const inputContent = inputRef.current.innerText;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputContent.trim()) {
        setMessages([...messages, inputContent]);
        inputRef.current.innerText = ""; // Clear the input
      }
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <EditableDiv
          ref={inputRef}
          contentEditable
          onKeyDown={handleInput}
          placeholder="Type your message..."
          data-placeholder="Type your message..."
        ></EditableDiv>
      </InputContainer>
    </ChatContainer>
  );
};

export default Test;
