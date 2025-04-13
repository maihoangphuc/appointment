"use client";

import * as React from "react";
import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const themeOptions = ["light", "dark", "system"];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-light-border dark:border-dark-border bg-light-bg dark:bg-black"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-light-text dark:text-white" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-light-text dark:text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-light-bg dark:bg-black border-light-border dark:border-dark-border"
      >
        {themeOptions.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            className={cn(
              "flex items-center justify-between text-light-text dark:text-white",
              theme === themeOption
                ? "bg-light-primary/15 text-light-primary dark:bg-dark-primary/15 dark:text-dark-primary"
                : "hover:bg-light-primary/5 dark:hover:bg-dark-border/20"
            )}
          >
            <span>
              {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
            </span>
            {theme === themeOption && (
              <Check className="h-4 w-4 ml-2 text-light-primary dark:text-dark-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
