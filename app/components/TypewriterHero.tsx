"use client";
import { useState, useEffect } from "react";

const CHULA_PINK = "#E8006F";

const words = [
  "Coding",
  "React.js",
  "Python",
  "TypeScript",
  "DevOps",
  "Next.js",
  "AI / ML",
];

export default function TypewriterHero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const current = words[wordIndex];

    if (!deleting && displayed === current) {
      // Pause before deleting
      const pause = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(pause);
    }

    if (deleting && displayed === "") {
      // Move to next word
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const speed = deleting ? 60 : 100;
    const timer = setTimeout(() => {
      setDisplayed((prev) =>
        deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, deleting, wordIndex]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block">
      <span
        className="relative z-10 text-transparent bg-clip-text"
        style={{
          backgroundImage: `linear-gradient(135deg, ${CHULA_PINK}, #ff69b4)`,
        }}
      >
        {displayed}
      </span>
      {/* blinking cursor */}
      <span
        className="inline-block w-[3px] h-[0.85em] ml-0.5 align-middle rounded-sm transition-opacity"
        style={{
          background: CHULA_PINK,
          opacity: blink ? 1 : 0,
        }}
      />
      <span className="absolute -bottom-1 left-0 right-0 h-3 bg-pink-100 rounded -z-0" />
    </span>
  );
}
