import React, { useState } from "react";
import Squares from "./Squares";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setAnswer("Thinking..."); // Show loading text while waiting for response

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your API key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Use a GPT model
          messages: [{ role: "user", content: question }],
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      setAnswer(data.choices[0].message.content);
    } catch (error) {
      setAnswer("Error fetching response. Please try again.");
      console.error("API Error:", error);
    }
  };

  return (
    <div className="app-container">
      <Squares 
        speed={0.5} 
        squareSize={50} 
        direction="up" 
        borderColor="grey" 
        hoverFillColor="white" 
        height="100%" 
        width="100%" 
      />

      <div className="chat-container">
        <h1>OPEN AI CHAT BOT</h1>
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            placeholder="Type Ask me anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <button type="submit">Ask</button>
        </form>

        <div className="response-box">
          <h2>Response:</h2>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
