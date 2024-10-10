"use client";
import * as React from "react";
import classNames from "classnames";
import {Input} from "../ui/input";
import {useXPRNSwap} from "./xprn-swap-provider";
import {toPrecision} from "./../../utils";
import {XPRNSwapField} from "./xprn-swap-field";
import {XPRNSwapSideButton} from "./xprn-swap-side-button";
import { XPRNSwapFieldsGroup } from "./xprn-swap-fields-group";
type XPRNSwapFieldsProps = React.HTMLAttributes<HTMLDivElement> & {};
export const XPRNSwapFields: React.FunctionComponent<XPRNSwapFieldsProps> = ({
  children,
  className,
}) => {
  const {swapSide, config} =
    useXPRNSwap();

  return (
    <XPRNSwapFieldsGroup>
      <div className="flex flex-col">
        <p>{swapSide == "buy" ? "Sell" : "Buy"}</p>
        <div className="grid grid-cols-[1fr,max-content] items-center gap-2">
          <XPRNSwapField type="quote"></XPRNSwapField>
        </div>
        <p className="opacity-50">Balance</p>
      </div>

      {config && config.sides && config.sides.length == 1 ? (
        <div className="w-full border-t opacity-50 relative"></div>
      ) : (
        <div className="w-full grid grid-cols-[1fr,min-content,1fr] items-center gap-2">
          <div className="w-full border-t opacity-50 relative"></div>
          <XPRNSwapSideButton></XPRNSwapSideButton>
          <div className="w-full border-t opacity-50 relative"></div>
        </div>
      )}

      <div className="flex flex-col">
        <p>{swapSide == "sell" ? "Sell" : "Buy"}</p>
        <div className="grid grid-cols-[1fr,max-content] items-center gap-2">
          <XPRNSwapField
            className="swap-fields__quote"
            type="base"
          ></XPRNSwapField>
        </div>
        <p className="opacity-50">Balance</p>
      </div>
    </XPRNSwapFieldsGroup>
  );
};
