"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Xin chào! Tôi là AI của bạn. Hỏi gì cũng được!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "❌ Lỗi server. Kiểm tra lại API.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white">
      <Card className="w-full max-w-2xl h-[85vh] flex flex-col rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.3)] border border-white/10 backdrop-blur-xl bg-white/5">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-wide">
            🤖 AI Chat Pro
          </h1>
          <div className="text-xs text-gray-400">Online</div>
        </div>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-end gap-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-sm">
                  🤖
                </div>
              )}

              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm leading-relaxed backdrop-blur-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-white/10 border border-white/10"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm">
                  😎
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <div className="text-purple-300 text-sm animate-pulse">
              ✨ AI đang suy nghĩ...
            </div>
          )}
        </CardContent>

        {/* Input */}
        <div className="p-4 border-t border-white/10 flex gap-2 bg-black/30 backdrop-blur-xl">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi..."
            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90"
          >
            Gửi
          </Button>
        </div>
      </Card>
    </div>
  );
}

// 🎨 THEME UPGRADE:
// - Gradient nền tím/xanh (cyber style)
// - Glassmorphism (blur + transparency)
// - Avatar user + AI
// - Bubble chat gradient
// - Glow shadow
// - Header giống app thật

// 👉 Nếu muốn nâng cấp tiếp:
// - Theme switch (dark/light)
// - Neon animation
// - Typing effect từng chữ
// - Sidebar giống ChatGPT
