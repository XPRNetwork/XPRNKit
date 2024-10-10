"use client";
import classNames from "classnames";
import {useXPRNSwap} from "./xprn-swap-provider";
import React, {useMemo} from "react";
type XPRNSwapSideButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  horizontal?: boolean;
};
export const XPRNSwapSideButton: React.FunctionComponent<
  XPRNSwapSideButtonProps
> = ({children, className, horizontal}) => {
  const {config, swapSide, setSwapSide} = useXPRNSwap();

  const rootClasses = classNames({
    "transition-transform ": true,
    "hover:rotate-180": true,

    [`${className}`]: className,
  });

  const onSideSwitch = React.useCallback(() => {
    swapSide == "sell" ? setSwapSide("buy") : setSwapSide("sell");
  }, [swapSide, setSwapSide]);

  const defaultIcon = React.useMemo(() => {
    if (horizontal) return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-left-right"
    >
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
      </svg>
    )
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-down-up "
      >
        <path d="m3 16 4 4 4-4" />
        <path d="M7 20V4" />
        <path d="m21 8-4-4-4 4" />
        <path d="M17 4v16" />
      </svg>
    );
  }, [horizontal]);

  return (
    <button className={rootClasses} onClick={() => onSideSwitch()}>{
    <>
      {config && config.sides && config.sides.length == 1 ? null : (
        <>
          {children ? (
            children
          ) : (
            <>
              {defaultIcon}
            </>
          )}
        </>
      )}
      </>
      }</button>
  );
};
