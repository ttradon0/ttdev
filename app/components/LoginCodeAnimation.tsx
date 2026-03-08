"use client";
import { useState, useEffect } from "react";

const CODE_LINES = [
  { prefix: "1 ", tokens: [{ text: "const ", c: "#fbcfe8" }, { text: "student", c: "#fde047" }, { text: " = {", c: "#ffffff" }] },
  { prefix: "2 ", tokens: [{ text: "  name", c: "#a5f3fc" }, { text: ": ", c: "#ffffff" }, { text: "'CEDT Chula'", c: "#86efac" }, { text: ",", c: "#ffffff" }] },
  { prefix: "3 ", tokens: [{ text: "  passion", c: "#a5f3fc" }, { text: ": ", c: "#ffffff" }, { text: "'Coding'", c: "#86efac" }, { text: ",", c: "#ffffff" }] },
  { prefix: "4 ", tokens: [{ text: "  level", c: "#a5f3fc" }, { text: ": ", c: "#ffffff" }, { text: "'ปี 1 🌱'", c: "#86efac" }, { text: ",", c: "#ffffff" }] },
  { prefix: "5 ", tokens: [{ text: "}", c: "#ffffff" }] },
  { prefix: "6 ", tokens: [] },
  { prefix: "7 ", tokens: [{ text: "console", c: "#fbcfe8" }, { text: ".log(", c: "#ffffff" }, { text: "'ยินดีต้อนรับ! 🎓'", c: "#86efac" }, { text: ")", c: "#ffffff" }] },
];

type Char = { char: string; color: string; lineIdx: number };

function buildChars(): Char[] {
  const chars: Char[] = [];
  CODE_LINES.forEach((line, li) => {
    line.tokens.forEach((token) => {
      for (const char of token.text) {
        chars.push({ char, color: token.c, lineIdx: li });
      }
    });
    // newline sentinel
    chars.push({ char: "\n", color: "", lineIdx: li });
  });
  return chars;
}

const ALL_CHARS = buildChars();

export default function LoginCodeAnimation() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (done) return;
    if (count >= ALL_CHARS.length) { setDone(true); return; }
    const delay = ALL_CHARS[count].char === "\n" ? 40 : 35;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count, done]);

  // cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  const lines: { prefix: string; spans: { text: string; color: string }[] }[] = [];
  CODE_LINES.forEach((l) => lines.push({ prefix: "", spans: [] }));
  let lineI = 0;
  for (let i = 0; i < count; i++) {
    const ch = ALL_CHARS[i];
    if (ch.char === "\n") { lineI++; continue; }
    const line = lines[ch.lineIdx];
    if (!line) continue;
    const last = line.spans[line.spans.length - 1];
    if (last && last.color === ch.color) {
      last.text += ch.char;
    } else {
      line.spans.push({ text: ch.char, color: ch.color });
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 mb-10 text-left min-h-[220px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-green-400/80" />
        <span className="ml-2 text-white/60 text-xs font-mono">welcome.ts</span>
      </div>
      <div className="font-mono text-sm space-y-1 text-white/90 leading-6">
        {lines.slice(0, lineI + 1).map((line, li) => (
          <div key={li} className="whitespace-pre">
            {line.spans.map((s, si) => (
              <span key={si} style={{ color: s.color }}>{s.text}</span>
            ))}
            {/* Cursor */}
            {li === lineI && !done && (
              <span
                className="inline-block w-[2px] h-[1em] align-middle rounded-sm ml-[1px] bg-white"
                style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
              />
            )}
            {done && li === CODE_LINES.length - 1 && (
              <span
                className="inline-block w-[2px] h-[1em] align-middle rounded-sm ml-[1px] bg-white"
                style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
