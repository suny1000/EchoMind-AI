import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Mic, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hi! I'm EcoMind AI, your climate literacy companion! 🌍 Ask me anything about climate change, sustainability, or take a quick quiz to test your knowledge!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    "What causes climate change?",
    "How can I reduce my carbon footprint?",
    "Give me a climate quiz!",
    "Tell me about renewable energy",
    "What are the effects of global warming?",
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (in real app, this would call GPT-4o-mini)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateMockResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateMockResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes("climate change") || lowerQ.includes("causes")) {
      return "Climate change is primarily caused by greenhouse gas emissions from human activities like burning fossil fuels, deforestation, and industrial processes. The main greenhouse gases include CO₂, methane, and nitrous oxide. These gases trap heat in Earth's atmosphere, leading to global warming. 🌡️";
    }
    
    if (lowerQ.includes("carbon footprint") || lowerQ.includes("reduce")) {
      return "Great question! Here are effective ways to reduce your carbon footprint:\n\n🚗 Transportation: Use public transport, bike, or walk\n🏠 Energy: Switch to renewable energy, improve insulation\n🍽️ Diet: Eat less meat, choose local/seasonal foods\n♻️ Consumption: Reduce, reuse, recycle\n🌱 Daily habits: Use energy-efficient appliances\n\nEvery small action counts toward a sustainable future!";
    }
    
    if (lowerQ.includes("quiz")) {
      return "🧠 Climate Quiz Time!\n\nQuestion 1: What percentage of global greenhouse gas emissions come from the energy sector?\n\nA) 25%\nB) 50% \nC) 73%\nD) 90%\n\nTake your guess! The answer is C) 73% - Energy production (electricity, heat, transportation) is the largest contributor to global emissions. Ready for more questions?";
    }
    
    if (lowerQ.includes("renewable energy")) {
      return "Renewable energy comes from natural sources that replenish themselves! 🌞⚡\n\n☀️ Solar: Converts sunlight to electricity\n💨 Wind: Uses wind turbines to generate power\n🌊 Hydro: Harnesses flowing water\n🌋 Geothermal: Uses Earth's heat\n🌱 Biomass: From organic materials\n\nThese sources produce clean energy with minimal environmental impact compared to fossil fuels!";
    }
    
    return "That's a fascinating question about our planet! 🌍 Climate science is complex but understanding it helps us make better decisions. Climate change affects weather patterns, ecosystems, sea levels, and human societies. The good news is that we have solutions - from renewable energy to sustainable practices. What specific aspect would you like to explore further?";
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-gradient">
            EcoMind AI Tutor
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered climate literacy companion. Ask questions, take quizzes, and learn about our planet! 🌍
          </p>
        </motion.div>

        <div className="grid gap-6">
          {/* Sample Questions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Quick Start Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="space-y-4 h-96 overflow-y-auto mb-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about climate change..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="icon" variant="outline">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;