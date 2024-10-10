"use client";
import * as React from "react";
import classNames from "classnames";
import {Input} from "../ui/input";
import {useXPRNSwap} from "./xprn-swap-provider";
import {toPrecision} from "../../utils";
type XPRNSwapFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  type: "quote" | "base";
};
export const XPRNSwapField: React.FunctionComponent<XPRNSwapFieldProps> = ({
  children,
  className,
  type,
}) => {
  const {currentSwapPair, swapValues,updateSwapValues,swapVolume} =
    useXPRNSwap();
  
  const rootClasses = classNames({
    "swap-field grid grid-cols-[1fr,max-content] items-center gap-2":
      true,
    [`${className}`]: className,
  });

  const fieldClass = classNames({
    "swap-field_field text-xl font-bold border-0 px-0 placeholder:text-current placeholder:text-opacity-50 focus:border-0 outline-none":
      true,
    
  });

  const [value, setValue] = React.useState<string>();
  const [isFocus, setFocus] = React.useState<boolean>();

  const onSwapValueChange = React.useCallback(
    (value: string) => {
      setValue(value);
      if (!currentSwapPair) return;
      
      if (type == "base") {
        const prevSwapValue = { ...swapValues,base:parseFloat(value) }
        updateSwapValues(prevSwapValue.base, prevSwapValue.quote, type);
      }
      if (type == "quote") {
        const prevSwapValue = { ...swapValues,quote:parseFloat(value) }
        updateSwapValues(prevSwapValue.base, prevSwapValue.quote, type);  
      }
    },
    [currentSwapPair, type, swapValues]
  );

  const onFocus = React.useCallback(() => {
    setFocus(true)
  },[setFocus])

  const normalizeValuePrecision = React.useCallback(() => {
    if (!currentSwapPair) return;
    if (type == "base")
      setValue(toPrecision(swapValues.base, currentSwapPair.basePrecision));
    if (type == "quote")
      setValue(toPrecision(swapValues.quote, currentSwapPair.quotePrecision));
      setFocus(false);
  }, [swapValues, currentSwapPair, type, setValue,setFocus]);

  const swapSymbol = React.useMemo(() => {
    if (!currentSwapPair) return "    ";
    if (type == "base") return currentSwapPair.baseToken;
    if (type == "quote") return currentSwapPair.quoteToken;
  }, [currentSwapPair, type]);

  React.useEffect(() => {
    if (!currentSwapPair) return;
    if (isFocus) return 
    if (!swapValues) return;
    
    if (type !== swapValues.lastMutated ) {
      if(type=='quote')setValue(toPrecision(swapValues.quote, currentSwapPair.quotePrecision));
      if(type=='base')setValue(toPrecision(swapValues.base, currentSwapPair.basePrecision));
    }
  }, [currentSwapPair, type, setValue,swapValues,isFocus,setValue]);
  

  return (
    <div className={rootClasses}>
      <Input
        className={fieldClass}
        placeholder="0.0"
        onBlur={() => normalizeValuePrecision()}
        onFocus={()=>onFocus()}
        onChange={e => {
          onSwapValueChange(e.target.value);
        }}
        value={value}
      ></Input>
      <p className="swap-field_dormant text-xl opacity-50 ">{swapSymbol}</p>
    </div>
  );
};
