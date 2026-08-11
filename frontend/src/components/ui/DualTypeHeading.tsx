import React from "react";
import { cn } from "@/lib/utils/cn";

export interface DualTypeHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4" | "p";
  children: string;
}

export const DualTypeHeading: React.FC<DualTypeHeadingProps> = ({
  className,
  tag = "h2",
  children,
  ...props
}) => {
  // Parse markdown-style asterisks (*) to italicized serif spans
  const parts = children.split(/(\*[^*]+\*)/g);

  const renderedContent = parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      // Remove asterisks and wrap in font-accent italic styling
      const text = part.slice(1, -1);
      return (
        <span key={index} className="font-accent italic font-normal text-coral">
          {text}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });

  const Component = tag;

  return (
    <Component
      className={cn(
        "font-sans text-brown-dark leading-tight tracking-tight",
        {
          // Text size matching layout contexts
          "text-3xl md:text-5xl font-light": tag === "h1",
          "text-2xl md:text-4xl font-normal": tag === "h2",
          "text-xl md:text-3xl font-medium": tag === "h3",
          "text-lg md:text-xl font-semibold": tag === "h4",
          "text-base": tag === "p",
        },
        className
      )}
      {...props}
    >
      {renderedContent}
    </Component>
  );
};
