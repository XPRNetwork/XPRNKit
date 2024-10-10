"use client";
import * as React from "react";
import classNames from "classnames";
import {XPRNSwapMarketsSelector} from "./xprn-swap-markets-selector";
import {XPRNSwapProvider} from "./xprn-swap-provider";
import {XPRNPairsSelector} from "./xprn-swap-pair-selector";
import {XPRNSwapLayout, type XPRNMarketProviderQuoteFilter, type XPRNSwapSide} from ".";
import {XPRNSwapFields} from "./xprn-swap-fields";
type XPRNSwapProps = React.HTMLAttributes<HTMLDivElement> & {
  filters?: XPRNMarketProviderQuoteFilter;
  sides?: XPRNSwapSide[],
  markets?:string[]
};
export const XPRNSwap: React.FunctionComponent<XPRNSwapProps> = ({
  children,
  className,
  filters,
  sides,
  markets
}) => {
  const rootClasses = classNames({
    "grid grid-col-1 gap-4 rounded-md border border-white p-4": true,
    [`${className}`]: className,
  });

  return (
    <XPRNSwapProvider config={{filters,sides,marketFilters:markets}}>
      <XPRNSwapLayout></XPRNSwapLayout>
    </XPRNSwapProvider>
  );
};
