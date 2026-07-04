"use client";

import { motion } from "framer-motion";

const SNIPPETS = [
  { text: "Congrats! 🎓", from: "Mum", top: "8%", left: "2%" },
  { text: "So proud of you", from: "Dr. Okonkwo", top: "12%", left: "76%" },
  { text: "We did it!", from: "Tobi", top: "64%", left: "0%" },
  { text: "Forever grateful", from: "Aisha", top: "70%", left: "80%" },
  { text: "Go change the world", from: "Mrs. Bello", top: "78%", left: "44%" },
];

export default function HeroCards() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden sm:block" aria-hidden="true">
      {SNIPPETS.map((snippet, i) => {
        const dx = (Math.random() - 0.5) * 280;
        const dy = (Math.random() - 0.5) * 180 - 60;
        const rotate = (Math.random() - 0.5) * 18;

        return (
          <motion.div
            key={snippet.text}
            className="absolute whitespace-nowrap rounded-2xl border border-border bg-white px-3.5 py-2 text-xs font-medium text-primary shadow-soft"
            style={{ top: snippet.top, left: snippet.left }}
            initial={{ opacity: 0, x: dx, y: dy, scale: 0.6, rotate }}
            animate={{ opacity: 0.9, x: 0, y: 0, scale: 1, rotate: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.5 + i * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {snippet.text}
            <span className="mt-0.5 block text-[10px] font-normal text-muted">
              — {snippet.from}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
