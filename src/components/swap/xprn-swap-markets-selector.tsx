"use client";
import * as React from "react";
import classNames from "classnames";
import {Select, SelectItem, SelectContent, SelectTrigger, SelectValue} from "../ui/select";
import {useXPRNSwap, type XPRNMarketProvider} from ".";
import {useEffect, useMemo, useState} from "react";
import {DEFAULT_SWAP_SERVICES} from "./xprn-swap-markets";


type XPRNSwapMarketsSelectorProps = React.HTMLAttributes<HTMLDivElement> & {};
export const XPRNSwapMarketsSelector: React.FunctionComponent<
  XPRNSwapMarketsSelectorProps
> = ({children, className}) => {
  const rootClasses = classNames({
    [`${className}`]: className,
  });

  const {marketProviders } = useXPRNSwap()
  const [services, setServices] = useState<XPRNMarketProvider[]>();

  const defaultServices = useMemo(() => {
    return DEFAULT_SWAP_SERVICES;
  }, []);

  const defaultService = useMemo(() => {
    let foundService = defaultServices.findLast(service => {
      return service.default;
    });

    if (foundService) return foundService;
    return defaultServices[0];
  }, [services, defaultServices]);

  useEffect(() => {}, [defaultService]);
  if (marketProviders.length <= 1) return
  return (
    <div className={`${rootClasses}`}>
      <Select
        value={defaultService.endpoint}
        
      >
        <SelectTrigger>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {defaultServices.map((service, index) => {
            return (
              <SelectItem key={index} value={service.endpoint}>
                {service.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
