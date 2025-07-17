"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "w-9 h-9 rounded-md opacity-0 pointer-events-none",
          className
        )}
      >
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 rounded-full hover:bg-accent bg-card hover:text-accent-foreground transition-all duration-200 hover:scale-110 active:scale-95",
        className
      )}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
    >
      <div className="relative h-4 w-4 flex items-center justify-center">
        <Sun
          className={cn(
            "absolute h-4 w-4 transition-all duration-500 ease-in-out transform",
            resolvedTheme === "dark"
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute h-4 w-4 transition-all duration-500 ease-in-out transform",
            resolvedTheme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
