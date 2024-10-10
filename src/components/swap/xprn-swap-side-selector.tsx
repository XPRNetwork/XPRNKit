"use client";
import * as React from "react";
import classNames from "classnames";
import {Select, SelectItem, SelectContent, SelectTrigger, SelectValue} from "../ui/select";
import {useXPRNSwap, type XPRNMarketProvider, type XPRNSwapSide, type XPRNSwapValues} from ".";
import {useEffect, useMemo, useState} from "react";
import {DEFAULT_SWAP_SERVICES} from "./xprn-swap-markets";


type XPRNSwapSideSelectorProps = React.HTMLAttributes<HTMLDivElement> & {
  
};
export const XPRNSwapSideSelector: React.FunctionComponent<
XPRNSwapSideSelectorProps
> = ({children, className}) => {
  const rootClasses = classNames({
    [`${className}`]: className,
  });

  const {currentSwapPair,setSwapSide,swapSide} = useXPRNSwap()

  const sides = useMemo(() => {
    return ['buy','sell']
  }, [])
  
  const onSideChange = React.useCallback((side: XPRNSwapSide) => {
    setSwapSide(side)
  },[currentSwapPair,setSwapSide])

  return (
    <div className={`${rootClasses}`}>
      <Select
        value={swapSide}
        onValueChange={(value) => {
          onSideChange(value as 'buy'|'sell')
        }}
      >
        <SelectTrigger>
          <SelectValue className="capitalize" placeholder="Side" />
        </SelectTrigger>
        <SelectContent>
          {sides.map((side, index) => {
            return (
              <SelectItem className="capitalize" key={index} value={side}>
                {side}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
