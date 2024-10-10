"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  XPRNMarketProvider,
  XPRNMarketProviderQuoteFilter,
  XPRNMarketProviderResult,
  XPRNSwapSide,
  XPRNSwapValues,
} from ".";
import {getSwapMarkets} from "./xprn-swap-markets";

import type {ServiceStatus} from "../../interfaces/service-status";
import {useXPRN} from "../../providers/XPRNProvider";
import {Volume} from "lucide-react";

export type XPRNSwapProviderConfig = {
  filters?: XPRNMarketProviderQuoteFilter;
  marketFilters?: string[];
  sides?: XPRNSwapSide[];
};

type XPRNProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  config?: XPRNSwapProviderConfig;
};

type XPRNSwapProviderContext = {
  marketProviders: XPRNMarketProvider[];
  currentMarketProvider: XPRNMarketProvider | null;
  setCurrentMarketProvider: (marketProvider: XPRNMarketProvider) => void;
  refreshMarketPairs: () => void;
  currentMarketPairs: XPRNMarketProviderResult[];
  refreshStatus: ServiceStatus;
  setCurrentSwapPair: (pair: XPRNMarketProviderResult) => void;
  currentSwapPair: XPRNMarketProviderResult | null;
  currentSwapValues: XPRNSwapValues | null;
  setCurrentSwapValues: (value: XPRNSwapValues) => void;
  swapVolume: number;
  setSwapVolume: (value: number) => void;
  config?: XPRNSwapProviderConfig;
  swapTransaction: any[];
  setSwapSide: (value: XPRNSwapSide) => void;
  swapSide: XPRNSwapSide;
  swapValues: XPRNSwapValues;
  updateSwapValues: (
    base: number,
    quote: number,
    lastMutated: "base" | "quote"
  ) => void;
};

const XPRNSwapContext = React.createContext<XPRNSwapProviderContext>({
  marketProviders: [],
  currentMarketProvider: null,
  setCurrentMarketProvider: (marketProvider: XPRNMarketProvider) => {},
  refreshMarketPairs: () => {},
  currentMarketPairs: [],
  refreshStatus: "idle",
  setCurrentSwapPair: pair => {},
  currentSwapPair: null,
  currentSwapValues: null,
  setCurrentSwapValues: (value: XPRNSwapValues) => {},
  swapTransaction: [],
  swapVolume: 0,
  setSwapSide: (value: XPRNSwapSide) => {},
  swapSide: "buy",
  setSwapVolume: (value: number) => {},
  swapValues: {base: 0, quote: 0, volume: 0, lastMutated: "base"},
  updateSwapValues: (base, quote, lastMutated) => {},
});
export const XPRNSwapProvider: React.FunctionComponent<XPRNProviderProps> = ({
  children,
  config,
}: XPRNProviderProps) => {
  const [services, setServices] = useState<XPRNMarketProvider[]>();
  const [currentMarketProvider, setCurrentMarketProvider] =
    useState<XPRNMarketProvider>();
  const [currentMarketPairs, setCurrentMarketPairs] =
    useState<XPRNMarketProviderResult[]>();
  const [refreshStatus, setRefreshStatus] = useState<ServiceStatus>();
  const [currentSwapPair, setCurrentSwapPair] =
    useState<XPRNMarketProviderResult>();

  const [swapTransaction, setSwapTransaction] = useState<any[]>();
  const [swapSide, setSwapSide] = useState<XPRNSwapSide>();
  const [swapVolume, setSwapVolume] = useState<number>();
  const [swapValues, setSwapValues] = useState<XPRNSwapValues>();
  const {session} = useXPRN();

  const refreshMarketPairs = useCallback((): void => {
    if (!currentMarketProvider) return;
    
    setRefreshStatus("pending");
    fetch(currentMarketProvider.endpoint)
      .then(async res => {
        
        return await res.json();
      })
      .then(res => {
        let parsedPairs = currentMarketProvider.parse(res);
        if (config && config.filters) {
          if (config.filters.baseSymbol)
            parsedPairs = parsedPairs.filter(pair => {
              if (!config.filters) return false;
              return pair.baseToken == config.filters.baseSymbol;
            });
          if (config.filters.quoteSymbol)
            parsedPairs = parsedPairs.filter(pair => {
              if (!config.filters) return false;
              return pair.quoteToken == config.filters.quoteSymbol;
            });
        }
        setCurrentMarketPairs(parsedPairs);
        setRefreshStatus("idle");
      })
      .catch(() => {
        setRefreshStatus("fail");
      });
  }, [currentMarketProvider, setRefreshStatus, setCurrentMarketPairs, config]);

  const defaultServices = useMemo(() => {
    const marketFilters = config ? config.marketFilters : undefined;
    return getSwapMarkets(marketFilters);
  }, []);

  const defaultService = useMemo(() => {
    let foundService = defaultServices.findLast(service => {
      return service.default;
    });

    if (foundService) return foundService;
    return defaultServices[0];
  }, [services, defaultServices]);

  const updateSwapValues = useCallback(
    (base: number, quote: number, lastMutated: "base" | "quote") => {
      
      if (!currentSwapPair) return;
      const validatedBase = base ?? 0;
      const validatedQuote = quote ?? 0;
      const validatedLastMutated = lastMutated ?? "base"; // Default to "base" or your desired default
  
      setSwapValues((prev) => {
        return {
          ...prev,
          base:
            validatedLastMutated === "quote"
              ? validatedQuote * currentSwapPair.lastPrice
              : validatedBase,
          quote:
            validatedLastMutated === "base"
              ? validatedBase / currentSwapPair.lastPrice
              : validatedQuote,
          volume: 0,
          lastMutated: validatedLastMutated,
        };
      });
  
    },
    [setSwapValues, currentSwapPair]
  );
  

  useEffect(() => {
    setRefreshStatus("idle");
    setSwapSide("buy");
    setCurrentMarketProvider(defaultService);
  }, [defaultService]);

  useEffect(() => {
    if (currentMarketProvider) refreshMarketPairs();
  }, [currentMarketProvider]);

  useEffect(() => {
    if (!swapVolume) {
      return;
    }

    if (!currentSwapPair) {
      return;
    }

    if (!currentMarketProvider) {
      return;
    }

    if (!swapSide) {
      return;
    }
    
    setSwapTransaction(
      currentMarketProvider.getTransaction(
        currentSwapPair,
        swapVolume,
        0,
        swapSide,
        session ? session : undefined
      )
    );
  }, [currentSwapPair, swapVolume, swapSide, currentMarketProvider, session]);

  React.useEffect(() => {
    if (!currentMarketPairs || currentMarketPairs.length == 0) return;
    setCurrentSwapPair(currentMarketPairs[0]);
  }, [currentMarketPairs]);

  React.useEffect(() => {
    if (config && config.sides && config.sides.length == 0) {
      throw new Error("XPRNProvider config sides could not be empty");
    }
    if (!config || !config.sides) {
      setSwapSide("buy");
    }
    if (config && config.sides) {
      setSwapSide(config.sides[0]);
    }

    updateSwapValues(0, 0, "base");
  }, [config,updateSwapValues]);

  React.useEffect(() => {
    if (!swapSide) setSwapVolume(0);
    if (!currentSwapPair) setSwapVolume(0);
    
  }, [swapValues, swapSide, currentSwapPair, setSwapVolume]);

  const providerValue = useMemo(() => {
    return {
      marketProviders: defaultServices,
      currentMarketProvider,
      setCurrentMarketProvider,
      refreshMarketPairs,
      currentMarketPairs: currentMarketPairs || [],
      refreshStatus,
      setCurrentSwapPair,
      currentSwapPair,
      swapTransaction,
      swapSide,
      setSwapSide,
      swapVolume,
      setSwapVolume,
      config,
      swapValues,
      updateSwapValues,
    };
  }, [
    defaultServices,
    currentMarketProvider,
    setCurrentMarketProvider,
    refreshMarketPairs,
    currentMarketPairs,
    refreshStatus,
    setCurrentSwapPair,
    currentSwapPair,
    swapTransaction,
    swapSide,
    setSwapSide,
    swapVolume,
    setSwapVolume,
    config,
    swapValues,
    updateSwapValues,
  ]);

  return (
    <XPRNSwapContext.Provider value={providerValue as any}>
      {children}
    </XPRNSwapContext.Provider>
  );
};

export function useXPRNSwap(): XPRNSwapProviderContext {
  return useContext(XPRNSwapContext);
}
