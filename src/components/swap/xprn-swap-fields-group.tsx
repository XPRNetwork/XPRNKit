"use client";
import * as React from "react";
import classNames from "classnames";
import {Input} from "../ui/input";
import {useXPRNSwap} from "./xprn-swap-provider";
import {toPrecision} from "./../../utils";
import {XPRNSwapField} from "./xprn-swap-field";
import {XPRNSwapSideButton} from "./xprn-swap-side-button";
type XPRNSwapFieldsGroupProps = React.HTMLAttributes<HTMLDivElement> & {horizontal?:boolean};
export const XPRNSwapFieldsGroup: React.FunctionComponent<XPRNSwapFieldsGroupProps> = ({
  children,
  className,
  horizontal
}) => {
  const {swapSide, config} =
    useXPRNSwap();

  const rootClasses = classNames({
    "flex gap-4": true,
    "flex-col":!horizontal,
    "flex-row":horizontal,
    "flex-col-reverse": swapSide == "sell" && !horizontal,
    "flex-row-reverse": swapSide == "sell" && horizontal,
    [`${className}`]: className,
  });

  return (
    <div className={`${rootClasses} `}>
      { children}
    </div>
  );
};
