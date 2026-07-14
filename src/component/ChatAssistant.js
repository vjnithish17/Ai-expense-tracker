import { useState } from "react";

import { generateReport } from "../api/Groq";

import "../css/chatass.css";

function ChatAssistant({ transactions }) {

  const [question, setQuestion] = useState("");

  const [chat, setChat] = useState([]);

  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!question.trim()) return;

    setChat(prev => [

      ...prev,

      { role: "user", text: question }

    ]);

    setLoading(true);

    try {

      const reply = await generateReport([

        ...transactions,

        { question }

      ]);

      setChat(prev => [

        ...prev,

        { role: "ai", text: reply }

      ]);

    } catch (error) {

      setChat(prev => [

        ...prev,

        { role: "ai", text: "Groq AI error" }

      ]);

    } finally {

      setLoading(false);

    }

    setQuestion("");

  };

  return (

    <div className="chat-container">

      <h1>AI Finance Chat Assistant</h1>

      <div className="chat-box">

        {chat.map((msg, index) => (

          <div key={index} className={`message ${msg.role}`}>

            <p>{msg.text}</p>

          </div>

        ))}

        {loading && <p>Thinking... 🤖</p>}

      </div>

      <div className="chat-input">

        <input

          type="text"

          value={question}

          onChange={(e) => setQuestion(e.target.value)}

          placeholder="Ask about your finances..."

        />

        <button onClick={askAI}>Send</button>

      </div>

    </div>

  );

}

export default ChatAssistant;
