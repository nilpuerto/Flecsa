"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden transition-colors duration-500",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-hidden",
          showRadialGradient &&
            "[mask-image:radial-gradient(ellipse_at_80%_-20%,black_35%,transparent_75%)]"
        )}
        style={
          {
            "--aurora":
              "repeating-linear-gradient(120deg,#2563eb_5%,#0ea5e9_15%,#7c3aed_22%,#ec4899_30%,#0ea5e9_38%,#2563eb_45%)",
            "--dark-gradient":
              "repeating-linear-gradient(120deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
            "--white-gradient":
              "repeating-linear-gradient(120deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_18%)",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "pointer-events-none absolute -inset-[12px] opacity-80 blur-[18px] filter after:absolute after:inset-0 after:content-[''] after:[background-attachment:fixed] after:[background-image:var(--white-gradient),var(--aurora)] after:[background-position:350%_50%,350%_50%] after:[background-size:200%,_100%] after:animate-aurora",
            "dark:[background-image:var(--dark-gradient),var(--aurora)] dark:opacity-80"
          )}
          style={
            {
              backgroundImage:
                "var(--white-gradient), var(--aurora)",
              backgroundSize: "300%, 200%",
              backgroundPosition: "50% 50%, 50% 50%",
            } as React.CSSProperties
          }
        ></div>
      </div>
      {children ? (
        <div className="relative z-10">{children}</div>
      ) : null}
    </div>
  );
};

