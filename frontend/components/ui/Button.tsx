"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-black hover:bg-[#e0bc4a] border border-transparent disabled:opacity-50 disabled:pointer-events-none",
  secondary:
    "bg-surface text-white border border-border hover:border-border-gold hover:bg-[#141414] disabled:opacity-50 disabled:pointer-events-none",
  outline:
    "bg-transparent text-gold border border-gold/60 hover:border-gold hover:bg-gold/10 disabled:opacity-50 disabled:pointer-events-none",
  ghost:
    "bg-transparent text-white border border-transparent hover:text-gold hover:bg-white/5 disabled:opacity-50 disabled:pointer-events-none",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
};

type ButtonAsLink = SharedButtonProps & {
  href: string;
  type?: never;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type ButtonAsButton = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    className,
    disabled,
  } = props;

  const classes = cn(baseClasses, variantClasses[variant], className);

  if ("href" in props && props.href) {
    const { href, onClick } = props;
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, ...rest } = props as ButtonAsButton;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
