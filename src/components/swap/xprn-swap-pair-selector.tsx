"use client";
import * as React from "react";
import classNames from "classnames";
import {useXPRNSwap} from "./xprn-swap-provider";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { XPRNMarketProviderResult } from ".";

type XPRNPairsSelectorProps = React.HTMLAttributes<HTMLDivElement> & {contentClassName?:string,itemsClassName?:string};
export const XPRNPairsSelector: React.FunctionComponent<
  XPRNPairsSelectorProps
> = ({children, className,contentClassName,itemsClassName}) => {
  const rootClasses = classNames({
    [`${className}`]: className,
  });
  const contentClasses = classNames({
    "bg-white": true,
    [`${contentClassName}`]: className,
  });
  const itemsClasses = classNames({
    "text-black": true,
    [`${itemsClassName}`]: className,
  });
  const { currentMarketPairs, refreshStatus, setCurrentSwapPair,currentSwapPair } = useXPRNSwap();
  const [defaultValue,setDefaultValue] = React.useState<string>()
  const onPairSelected = React.useCallback(
    (pairName: string) => {
      const foundPair = currentMarketPairs.findLast(pair => {
        return pair.pair == pairName;
      });
      if (foundPair) setCurrentSwapPair(foundPair);
    },
    [currentMarketPairs]
  );

  React.useEffect(() => {
    
    if (currentSwapPair) setDefaultValue(currentSwapPair.pair);
  }, [currentSwapPair]);

  if (currentMarketPairs.length <= 1) return;

  return (
    <>
      {refreshStatus == "idle" && (
        <>
          <Select value={defaultValue } onValueChange={pair => onPairSelected(pair)}>
            <SelectTrigger className={`${rootClasses}`}>
              <SelectValue placeholder="Pairs"></SelectValue>
            </SelectTrigger>
            <SelectContent className={contentClasses}>
              {currentMarketPairs.map((pair, index) => {
                return (
                  <SelectItem key={index} value={pair.pair} className={itemsClasses}>
                    {pair.askName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </>
      )}
      {refreshStatus == "pending" && <>Loading Pairs</>}
      {refreshStatus == "fail" && <>Pairs shit</>}
    </>
  );
};
