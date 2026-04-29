"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypingEffectProps = {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
};

export function TypingEffect({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = "",
}: TypingEffectProps) {
  const shouldReduceMotion = useReducedMotion();
  const [text, setText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentText.slice(0, text.length + 1));

          if (text === currentText) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
            return;
          }
        } else {
          setText(currentText.slice(0, text.length - 1));

          if (text === "") {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [text, textIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {text}
      <span className={shouldReduceMotion ? "text-accent" : "animate-pulse text-accent"}>|</span>
    </span>
  );
}
