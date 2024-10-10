"use client";
import classNames from "classnames";
import * as React from "react";
import {XPRNAvatar, XPRNAvatarFallback, XPRNAvatarImage} from "./xprn-avatar";
import {useXPRN} from "../../providers/XPRNProvider";
import {XPRNConnectButton} from "./../xprn-session";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./../ui/dropdown";
import {XPRNSessionActor} from "./xprn-session-actor";
import {XPRNSessionName} from "./xprn-session-name";

type XPRNIdentityProps = React.HTMLAttributes<HTMLDivElement> & {
  showLogout?: boolean;
  activeSessionClassName?: string;
  dropdownClassName?: string;
  avatarClassName?: string;
};
export const XPRNIdentity: React.FunctionComponent<XPRNIdentityProps> = ({
  children,
  className,
  showLogout,
  activeSessionClassName,
  dropdownClassName,
  avatarClassName,
}) => {
  const rootClasses = classNames({
    "grid grid-cols-[min-content,1fr] gap-4 items-center inline": true,
    [`${className}`]: className,
  });

  const activeSessionClasses = classNames({
    "flex flex-row items-center gap-2": true,
    [`${activeSessionClassName}`]: activeSessionClassName,
  });

  const dropdownClasses = classNames({
    "flex flex-col items-center gap-2": true,
    [`${dropdownClassName}`]: dropdownClassName,
  });

  const {session, profile, disconnect, authentication} = useXPRN();

  const handleDisconnect = React.useCallback(
    (e: any) => {
      e.preventDefault();
      disconnect();
    },
    [disconnect]
  );

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="inline w-auto flex-grow-0">
            <div className={activeSessionClasses}>
              <div className="w-10 h-10">
                <XPRNAvatar className={avatarClassName} />
              </div>
              <div className="flex flex-col">
                <XPRNSessionName className="text-md font-bold" />
                <div className="flex gap-2">
                  <XPRNSessionActor className="text-md" />
                  {showLogout && (
                    <a
                      href="#"
                      className="underline"
                      onClick={e => handleDisconnect(e)}
                    >
                      Log out
                    </a>
                  )}
                </div>
              </div>
              
            </div>
          </DropdownMenuTrigger>
          {children && (
            <DropdownMenuContent className={dropdownClasses}>
              {children}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      ) : (
        <XPRNConnectButton className={rootClasses}>Connect</XPRNConnectButton>
      )}
    </>
  );
};
