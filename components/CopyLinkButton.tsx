"use client";

import { useState } from "react";
import Button from "./Button";

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="accent" onClick={handleCopy}>
      {copied ? "Copied!" : "Copy link"}
    </Button>
  );
}
