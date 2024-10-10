"use client";
import {useXPRN} from "../providers/XPRNProvider";
import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "../lib/utils";

const XPRNConnectButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap ",
  {
    variants: {
      variant: {
        
      },
      size: {
        
      },
    },
    defaultVariants: {
      
      
    },
  }
);

export interface XPRNConnectButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof XPRNConnectButtonVariants> {
  asChild?: boolean;
}

const XPRNConnectButton = React.forwardRef<
  HTMLButtonElement,
  XPRNConnectButtonProps
>(({className, variant, size, asChild = false,onClick,children, ...props}, ref) => {
  const Comp = asChild ? Slot : "button";
  const {session, connect, disconnect} = useXPRN();
  return (
    <>
      {!session && (
        <Comp
          onClick={()=>connect()}
          className={cn(XPRNConnectButtonVariants({variant, size, className}))}
          ref={ref}
        children={children}
          {...props}
        />
      )}
      {session && (
        <Comp
          onClick={()=>disconnect()}
          className={cn(XPRNConnectButtonVariants({variant, size, className}))}
          ref={ref}
        children={`Log out (${session.auth.actor.toString()})`}
          {...props}
        />
      )}
    </>
  );
});
XPRNConnectButton.displayName = "XPRNConnectButton";

export {XPRNConnectButton, XPRNConnectButtonVariants};
