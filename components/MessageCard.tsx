import { timeAgo } from "@/lib/utils";
import type { PortalMessage } from "@/types";

export default function MessageCard({ message }: { message: PortalMessage }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
      <p className="font-body text-[15px] leading-relaxed text-primary">
        {message.message}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">{message.sender_name}</p>
          <p className="text-xs text-muted">{message.relationship}</p>
        </div>
        <span className="text-xs text-muted">{timeAgo(message.created_at)}</span>
      </div>
    </div>
  );
}
