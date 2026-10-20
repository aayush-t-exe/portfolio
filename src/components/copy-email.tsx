"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "@/components/icons";

export function CopyEmail({
  email,
  className = "",
  children,
}: {
  email: string;
  className?: string;
  children?: ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard can be blocked (insecure context, permissions). Fall back to mailto.
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`press group inline-flex items-center gap-2 ${className}`}
      aria-label={`Copy email address ${email}`}
    >
      {children ?? <span>{email}</span>}
      <span className="relative grid size-4 place-items-center" aria-hidden>
        <Copy
          size={15}
          className={`absolute transition-[opacity,filter,transform] duration-200 ease-out ${
            copied ? "scale-75 opacity-0 blur-[2px]" : "opacity-100"
          }`}
        />
        <Check
          size={15}
          className={`absolute text-accent transition-[opacity,filter,transform] duration-200 ease-out ${
            copied ? "opacity-100" : "scale-75 opacity-0 blur-[2px]"
          }`}
        />
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
