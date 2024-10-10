"use client";
import React from "react";
import classNames from "classnames";
import {useXPRN} from "../../providers/XPRNProvider";
type XPRNSessionNameProps = React.HTMLAttributes<HTMLHeadElement> & {};
export const XPRNSessionName: React.FunctionComponent<XPRNSessionNameProps> = ({
  children,
  className,
}) => {
  const {profile, authentication} = useXPRN();
  const rootClasses = classNames({
    "flex gap-2 items-center justify-center": true,
    [`${className}`]: className,
  });
  if (!profile) return <></>;
  return (
    <div className={`${rootClasses}`}>
      <h3>@{profile.displayName.toString()}</h3>

      
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-badge-check"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        
        {authentication && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-id-card"
          >
            <path d="M16 10h2" />
            <path d="M16 14h2" />
            <path d="M6.17 15a3 3 0 0 1 5.66 0" />
            <circle cx="9" cy="11" r="2" />
            <rect x="2" y="5" width="20" height="14" rx="2" />
          </svg>
        )}
      
    </div>
  );
};
