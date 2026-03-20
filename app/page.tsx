"use client";
import { useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🤖 AI Chat</h1>

      {messages.map((m, i) => (
        <p key={i}><b>{m.role}:</b> {m.content}</p>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Gửi</button>
    </div>
  );
}
