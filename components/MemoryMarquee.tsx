import type { PortalMessage } from "@/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MemoryMarquee({ messages }: { messages: PortalMessage[] }) {
  const looped = [...messages, ...messages];

  return (
    <div className="relative mt-12 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

      <div className="marquee-track flex w-max gap-5">
        {looped.map((message, i) => (
          <div
            key={`${message.id}-${i}`}
            className="w-[280px] flex-shrink-0 rounded-2xl border border-border bg-background p-6"
          >
            <p className="text-[14.5px] leading-relaxed text-primary">{message.message}</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                {initials(message.sender_name)}
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">{message.sender_name}</p>
                <p className="text-xs text-muted">{message.relationship}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
