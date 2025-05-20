import React from "react";
import type { JSX } from "react";
import { cn } from "@/lib/utils"; // optional utility to combine classNames


type DarkModeWrapperProps<T extends keyof JSX.IntrinsicElements> = {
  as?: T;
  darkMode?: boolean;
  className?: string;
  children?: React.ReactNode; // <-- make optional here
} & JSX.IntrinsicElements[T];

const DarkModeWrapper = <T extends keyof JSX.IntrinsicElements = "div">({
  as,
  darkMode = false,
  className = "",
  children,
  ...rest
}: DarkModeWrapperProps<T>) => {
  const Component = as || "div";

  const darkClasses = "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]";
  const lightClasses = "bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]";

  const combinedClasses = cn(
    darkMode ? darkClasses : lightClasses,
    className
  );

  return React.createElement(
    Component,
    { className: combinedClasses, ...rest },
    children
  );
};

export default DarkModeWrapper;
