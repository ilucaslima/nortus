"use client";

import { LoadingSpinner } from "@/components";
import { RobotIcon, SendIcon } from "@/components/ui/Icons";
import { useChat } from "@/hooks/useChat";
import { useState } from "react";

export default function ChatAssistente() {
  const { chatData, isLoading, error } = useChat();
  const [newMessage, setNewMessage] = useState("");

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Erro: {error}</div>;
  if (!chatData) return <div>Nenhum dado de chat disponível</div>;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Enviando mensagem:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className="h-full flex flex-col m-8 bg-card-bg border border-blue-500/20 rounded-3xl">
        <p className="text-sm mx-auto mt-10 text-gray-400">HOJE, 16:40</p>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {chatData.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user_message"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 ${
                      message.type === "user_message"
                        ? "bg-[#1876d2] text-white"
                        : message.type === "ai_suggestion"
                        ? "bg-[#3f4859] text-white"
                        : "bg-[#3f4859] text-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.type !== "user_message" && (
                        <div className="mt-1">
                          {message.type === "ai_suggestion" && (
                            <RobotIcon className="w-5 h-5 text-blue-400" />
                          )}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1 opacity-50">
                          {message.author}
                        </p>
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <div className="flex items-center gap-2 justify-end mt-2">
                          <span className="text-xs text-gray-300">
                            {message.timestamp}
                          </span>
                          {message.type === "user_message" && (
                            <span className="text-xs text-green-400">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {chatData.iaSuggestion && (
                <div className="flex flex-wrap justify-end ml-auto gap-2">
                  {chatData.conversationAnalysis.futureSteps.actions.map(
                    (action) => (
                      <button
                        key={action.id}
                        className="p-4 px-8 bg-[#1876d2] text-white text-xs rounded-full hover:bg-[#1565c0] transition-colors"
                      >
                        {action.action}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center max-w-3xl mx-auto gap-3 bg-card-bg border border-zinc-400 rounded-full px-2 py-6 pr-5">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escreva aqui..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-2 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-[#1876d2] text-white rounded-full hover:bg-[#1565c0] transition-colors"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
