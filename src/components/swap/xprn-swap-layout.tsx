"use client";
import * as React from "react";
import classNames from "classnames";
import {XPRNSwapMarketsSelector} from "./xprn-swap-markets-selector";
import {useXPRNSwap, XPRNSwapProvider} from "./xprn-swap-provider";
import {XPRNPairsSelector} from "./xprn-swap-pair-selector";
import {type XPRNMarketProviderQuoteFilter} from ".";
import {XPRNSwapFields} from "./xprn-swap-fields";
import {XPRNTransaction} from "../xprn-transaction";
import {XPRNSwapSideSelector} from "./xprn-swap-side-selector";
import { XPRNSwapButton } from "./xprn-swap-button";
type XPRNSwapLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  filters?: XPRNMarketProviderQuoteFilter;
};
export const XPRNSwapLayout: React.FunctionComponent<XPRNSwapLayoutProps> = ({
  children,
  className,
  filters,
}) => {
  const {
    swapTransaction,
    currentMarketPairs,
    currentSwapPair,
    marketProviders,
    swapSide
  } = useXPRNSwap();
  const rootClasses = classNames({
    "grid grid-col-1 gap-4 rounded-md border border-white p-4": true,
    [`${className}`]: className,
  });

  const headerClass = classNames({
    "grid grid-cols-6 gap-4": marketProviders.length > 1,
    hidden: marketProviders.length <= 1 && currentMarketPairs.length <= 1,
    [`${className}`]: className,
  });
  return (
    <div className={`${rootClasses} `}>
      <div className={headerClass}>
        <XPRNSwapMarketsSelector className="col-span-2"/>
        <XPRNPairsSelector className="col-span-4" />
      </div>
      <XPRNSwapFields />
      <div>
        <XPRNSwapButton></XPRNSwapButton>
      </div>
    </div>
  );
};
