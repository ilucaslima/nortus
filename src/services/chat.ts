import { api } from "@/config/api";
import Cookies from "js-cookie";

export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: "user_message" | "assistant_message" | "ai_suggestion";
}

export interface ConversationInsight {
  id: string;
  type: string;
  category: string;
}

export interface ConversationAction {
  id: string;
  action: string;
  priority: "high" | "medium" | "low";
}

export interface ConversationAnalysis {
  insights: {
    title: string;
    insights: ConversationInsight[];
  };
  futureSteps: {
    title: string;
    actions: ConversationAction[];
  };
}

export interface ChatData {
  messages: ChatMessage[];
  iaSuggestion: string;
  conversationAnalysis: ConversationAnalysis;
}

export const chatService = async (): Promise<ChatData> => {
  try {
    const token = Cookies.get("auth-token") || "";
    const response = await api.get("/nortus-v1/chat", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch chat data");
  }
};
