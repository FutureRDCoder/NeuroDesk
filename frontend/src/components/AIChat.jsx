import { useState } from "react";

import api from "../api/axios";


function AIChat() {
  const [messages, setMessages] =
    useState([]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response = await api.post(
        "/ai/chat",
        {
          message: input,
        }
      );

      const aiMessage = {
        role: "assistant",
        content:
          response.data.response,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setInput("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed right-6 bottom-6 w-96 h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border">
      
      {/* Header */}
      <div className="bg-black text-white p-4 text-xl font-bold">
        NeuroDesk AI
      </div>


      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-gray-500 text-sm">
            Ask NeuroDesk AI anything...
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-[85%] ${
              msg.role === "user"
                ? "bg-black text-white ml-auto"
                : "bg-white shadow"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="bg-white shadow p-3 rounded-xl w-fit">
            Thinking...
          </div>
        )}
      </div>


      {/* Input */}
      <div className="p-4 border-t flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Ask AI..."
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-5 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AIChat;