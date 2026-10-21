import type { ReactNode } from "react";
import { Check, Copy } from "@/components/icons";

/**
 * Copy-to-clipboard button. A server component: PageBehavior handles the click
 * (delegated on [data-copy-email]), sets `data-copied` for the icon swap (CSS) and writes
 * the announcement into the live region that follows the button.
 */
export function CopyEmail({
  email,
  className = "",
  children,
}: {
  email: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <button
        type="button"
        data-copy-email={email}
        className={`press group inline-flex items-center gap-2 ${className}`}
        aria-label={`Copy email address ${email}`}
      >
        {children ?? <span>{email}</span>}
        <span className="relative grid size-4 place-items-center" aria-hidden>
          <Copy size={15} className="ce-copy absolute transition-[opacity,filter,transform] duration-200 ease-out" />
          <Check size={15} className="ce-check absolute text-accent transition-[opacity,filter,transform] duration-200 ease-out" />
        </span>
      </button>
      {/* Outside the button: a button's children are presentational, so a live region inside
          it isn't reliably announced. */}
      <span role="status" aria-live="polite" className="sr-only" />
    </>
  );
}
