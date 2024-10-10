"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import {cn} from "./../../lib/utils";

const XPRNAvatarWrapper = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({className, ...props}, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
XPRNAvatarWrapper.displayName = AvatarPrimitive.Root.displayName;

const XPRNAvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({className, ...props}, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
XPRNAvatarImage.displayName = AvatarPrimitive.Image.displayName;

const XPRNAvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({className, ...props}, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full ",
      className
    )}
    {...props}
  />
));
XPRNAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

import classNames from "classnames";
import {useXPRN} from "../../providers/XPRNProvider";
type XPRNAvatarProps = React.HTMLAttributes<HTMLDivElement>;
const XPRNAvatar: React.FunctionComponent<XPRNAvatarProps> = ({className,...props}) => {
  const {profile,session} = useXPRN();
  const rootClasses = classNames({
    [`${className}`]: className,
  });
  
  
  if(!session) return 
  return (
    
      <XPRNAvatarWrapper className={rootClasses} {...props}>
        <XPRNAvatarFallback >{session.auth.actor.toString()[0]}</XPRNAvatarFallback>
        {profile && profile.avatar && (
          <XPRNAvatarImage src={`data:image/png;base64,${profile.avatar}`} sizes="" />
        )}
      </XPRNAvatarWrapper>
    
  );
};

export {XPRNAvatarWrapper, XPRNAvatar, XPRNAvatarImage, XPRNAvatarFallback};
