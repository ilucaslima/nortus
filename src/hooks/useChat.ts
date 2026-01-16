import { ChatData, chatService } from "@/services/chat";
import { useEffect, useState } from "react";

export function useChat() {
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setIsLoading(true);
        const data = await chatService();
        setChatData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch chat data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatData();
  }, []);

  return { chatData, isLoading, error };
}
