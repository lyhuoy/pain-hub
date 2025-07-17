"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import quotes from "@/constants/quotes";

interface QuoteDisplayProps {
  className?: string;
}

const QuoteDisplay = ({ className }: QuoteDisplayProps) => {
  const [currentQuote, setCurrentQuote] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const getRandomQuote = (): string => {
    if (quotes.length === 0) return "";
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  useEffect(() => {
    const randomQuote = getRandomQuote();
    setCurrentQuote(randomQuote);
    setIsLoading(false);
  }, []);

  const refreshQuote = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomQuote = getRandomQuote();
      setCurrentQuote(randomQuote);
      setIsLoading(false);
    }, 300);
  };
  if (isLoading) {
    return (
      <Card className={cn("w-full mx-auto shadow-none border-none", className)}>
        <CardContent className="py-2 px-4 relative min-h-[4rem]">
          <button
            className="absolute right-4 top-[-10px] p-2 rounded-full hover:bg-muted transition-colors z-10"
            disabled
          >
            <RefreshCw className="h-4 w-4 text-muted-foreground animate-spin" />
          </button>
          <div className="absolute inset-x-4 inset-y-2 flex items-center justify-center">
            <div className="animate-pulse w-full max-w-md">
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-4/5 mx-auto"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuote) {
    return null;
  }

  return (
    <Card className={cn("w-full mx-auto shadow-none border-none", className)}>
      <CardContent className="py-2 px-4 relative min-h-[4rem]">
        <button
          onClick={refreshQuote}
          className="absolute right-4 top-[-10px] p-2 rounded-full hover:bg-muted transition-colors z-10"
          title="Get new quote"
        >
          <RefreshCw className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </button>
        <div className="absolute inset-x-4 inset-y-2 flex items-center justify-center">
          <blockquote className="text-base leading-relaxed text-foreground italic text-center w-full">
            &ldquo;{currentQuote}&rdquo;
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteDisplay;
