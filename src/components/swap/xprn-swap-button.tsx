"use client";
import React from "react";
import classNames from "classnames";
import {
  XPRNTransaction,
  type XPRNTransactionButtonProps,
} from "../xprn-transaction";
import { useXPRNSwap } from "./xprn-swap-provider";
type XPRNSwapButtonProps = Omit<XPRNTransactionButtonProps,'actions'>;
export const XPRNSwapButton: React.FunctionComponent<XPRNSwapButtonProps> = ({
  children,
  className,
}) => {
  const { currentSwapPair, swapTransaction,swapSide } = useXPRNSwap();
  const rootClasses = classNames({
    [`${className}`]: className,
  });

  const swapSymbolsLabel = React.useMemo(() => {
    if (!currentSwapPair) return `Swap`
    if (swapSide == 'buy') return `Swap ${currentSwapPair.quoteToken} / ${currentSwapPair.baseToken}`
    if (swapSide == 'sell') return `Swap ${currentSwapPair.quoteToken} / ${currentSwapPair.baseToken}`
  },[])

  return (
    <XPRNTransaction className="w-full" actions={swapTransaction}>
      {swapSymbolsLabel}
    </XPRNTransaction>
  );
};
