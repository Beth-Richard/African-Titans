"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { getChatbotResponse } from "@/lib/chatbot"; // import { getChatbotResponse } from "@/lib/data"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const welcomeMessage: Message = {
  id: "welcome",
  text: "Hello! I'm the Campus Hub assistant. Ask me about jobs, accommodation, events, transport, or anything else about student life at the University of Wolverhampton.",
  sender: "bot",
  timestamp: new Date(),
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([welcomeMessage])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const messagesEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getChatbotResponse(userMsg.text)
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setTyping(false)
    }, 800 + Math.random() * 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = [
    "How do I find jobs?",
    "Tell me about accommodation",
    "What events are coming up?",
    "How do I apply?",
  ]

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all",
          open ? "bg-muted-foreground text-background" : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
        )}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-lg border bg-card shadow-xl sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
              <Bot className="h-4 w-4 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold">Campus Hub Assistant</p>
              <p className="text-xs text-primary-foreground/70">Ask me anything</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2",
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/30"
                    )}
                  >
                    {msg.sender === "user" ? (
                      <User className="h-3.5 w-3.5" />
                    ) : (
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/30">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="rounded-lg bg-muted px-3 py-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEnd} />
            </div>
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 border-t px-4 py-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q)
                    setTimeout(() => {
                      const userMsg: Message = {
                        id: `u-${Date.now()}`,
                        text: q,
                        sender: "user",
                        timestamp: new Date(),
                      }
                      setMessages((prev) => [...prev, userMsg])
                      setTyping(true)
                      setTimeout(() => {
                        const botResponse = getChatbotResponse(q)
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: `b-${Date.now()}`,
                            text: botResponse,
                            sender: "bot",
                            timestamp: new Date(),
                          },
                        ])
                        setTyping(false)
                        setInput("")
                      }, 800)
                    }, 100)
                  }}
                  className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="h-9 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
