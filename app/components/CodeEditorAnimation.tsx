"use client";
import { useState, useEffect } from "react";

const CHULA_PINK = "#E8006F";

// Code lines to type out one by one
const CODE_LINES = [
  { prefix: "1 ", tokens: [{ text: "import ", c: "#9ca3af" }, { text: "React ", c: "#e5e7eb" }, { text: "from ", c: "#9ca3af" }, { text: "'react'", c: "#6b7280" }, { text: ";", c: "#d1d5db" }] },
  { prefix: "2 ", tokens: [{ text: "import ", c: "#9ca3af" }, { text: "{ useState } ", c: "#d1d5db" }, { text: "from ", c: "#9ca3af" }, { text: "'react'", c: "#6b7280" }, { text: ";", c: "#d1d5db" }] },
  { prefix: "3 ", tokens: [] },
  { prefix: "4 ", tokens: [{ text: "function ", c: "#9ca3af" }, { text: "HelloCEDT", c: "#e5e7eb" }, { text: "() {", c: "#d1d5db" }] },
  { prefix: "5 ", tokens: [{ text: "  const ", c: "#9ca3af" }, { text: "[course, setCourse] ", c: "#d1d5db" }, { text: "= ", c: "#9ca3af" }, { text: "useState", c: "#e5e7eb" }, { text: "('TTDev')", c: "#6b7280" }, { text: ";", c: "#d1d5db" }] },
  { prefix: "6 ", tokens: [] },
  { prefix: "7 ", tokens: [{ text: "  return ", c: "#9ca3af" }, { text: "(", c: "#d1d5db" }] },
  { prefix: "8 ", tokens: [{ text: "    <", c: "#6b7280" }, { text: "div ", c: "#9ca3af" }, { text: "className", c: "#a1a1aa" }, { text: "=", c: "#9ca3af" }, { text: '"cedt"', c: "#6b7280" }, { text: ">", c: "#6b7280" }] },
  { prefix: "9 ", tokens: [{ text: "      <", c: "#6b7280" }, { text: "h1", c: "#9ca3af" }, { text: ">", c: "#6b7280" }, { text: "จุฬาฯ ❤️ Coding", c: "#e5e7eb" }, { text: "</", c: "#6b7280" }, { text: "h1", c: "#9ca3af" }, { text: ">", c: "#6b7280" }] },
  { prefix: "10", tokens: [{ text: "    </", c: "#6b7280" }, { text: "div", c: "#9ca3af" }, { text: ">", c: "#6b7280" }] },
  { prefix: "11", tokens: [{ text: "  );", c: "#d1d5db" }] },
  { prefix: "12", tokens: [{ text: "}", c: "#d1d5db" }] },
];

// Flatten into characters with color metadata for typing
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

export default function CodeEditorAnimation() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (done) return;
    if (count >= ALL_CHARS.length) { setDone(true); return; }
    const delay = ALL_CHARS[count].char === "\n" ? 30 : 28;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count, done]);

  // cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  // Build display lines up to current typed characters
  const lines: { prefix: string; spans: { text: string; color: string }[] }[] = [];
  CODE_LINES.forEach((l) => lines.push({ prefix: l.prefix, spans: [] }));
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
    <div className="relative w-full bg-[#1a1b26] rounded-2xl shadow-2xl overflow-hidden border border-[#2d2f3f]">
      {/* Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#16171f] border-b border-[#2d2f3f]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-[#4a4b5a] font-mono">index.tsx — TTDev</span>
      </div>
      {/* Tabs */}
      <div className="flex text-xs font-mono border-b border-[#2d2f3f] bg-[#16171f]/60">
        <div className="px-4 py-2 bg-[#1a1b26] border-b-2 font-semibold" style={{ color: CHULA_PINK, borderColor: CHULA_PINK }}>index.tsx</div>
        <div className="px-4 py-2 text-[#4a4b5a]">styles.css</div>
        <div className="px-4 py-2 text-[#4a4b5a]">api.ts</div>
      </div>
      {/* Code area */}
      <div className="p-5 font-mono text-sm leading-7 select-none min-h-[280px]">
        {lines.slice(0, lineI + 1).map((line, li) => (
          <div key={li} className="flex">
            <span className="text-[#3d3f52] mr-4 w-6 shrink-0 text-right select-none">{line.prefix}</span>
            <span>
              {line.spans.map((s, si) => (
                <span key={si} style={{ color: s.color }}>{s.text}</span>
              ))}
              {/* Blinking cursor at end of current line */}
              {li === lineI && !done && (
                <span
                  className="inline-block w-[2px] h-[1em] align-middle rounded-sm ml-[1px]"
                  style={{ background: CHULA_PINK, opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
                />
              )}
              {/* Blinking cursor at the end when done */}
              {done && li === CODE_LINES.length - 1 && (
                <span
                  className="inline-block w-[2px] h-[1em] align-middle rounded-sm ml-[1px]"
                  style={{ background: CHULA_PINK, opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
                />
              )}
            </span>
          </div>
        ))}
      </div>
      {/* Status bar */}
      <div
        className="flex items-center justify-between px-5 py-2 text-xs text-white/80 font-mono"
        style={{ background: CHULA_PINK }}
      >
        <div className="flex items-center gap-3">
          <span>⎇ main</span>
          <span>TypeScript React</span>
        </div>
        <div className="flex items-center gap-3">
          <span>✓ 0 errors</span>
          <span>CEDT Chula 🎓</span>
        </div>
      </div>
    </div>
  );
}
