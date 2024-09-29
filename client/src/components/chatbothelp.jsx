import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false); // Chatbox toggle
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // Stores chat history
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);
    
    const userMessage = { role: "user", text: question };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAzCeTiV5MH7i-hZlr_8lDq-g9t5p_10uk`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const botResponse = {
        role: "bot",
        text: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.log(error);
      const errorMessage = { role: "bot", text: "Sorry, something went wrong." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setGeneratingAnswer(false);
    setQuestion(""); // Clear input after submission
  }

  return (
    <div className="z-50 absolute">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-10 right-10 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition-all"
        >
          💬 Chat
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-10 right-10 bg-white w-80 h-96 shadow-lg rounded-lg flex flex-col">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4 flex justify-between items-center rounded-md">
            <span className="font-bold">Chat with us</span>
            <button onClick={toggleChat} className="text-white font-bold">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user"
                    ? "text-right text-blue-600"
                    : "text-left text-purple-600"
                }`}
              >
                <p
                  className={`${
                    message.role === "user"
                      ? "bg-blue-100"
                      : "bg-purple-100"
                  } p-2 rounded-lg inline-block max-w-xs`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={generateAnswer}
            className="bg-gray-100 p-4 flex items-center"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 p-2 border rounded-md"
              placeholder="Ask a question..."
              disabled={generatingAnswer}
              required
            />
            <button
              type="submit"
              className={`ml-2 bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 transition-all ${
                generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={generatingAnswer}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
