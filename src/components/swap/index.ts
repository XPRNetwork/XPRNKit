import type { LinkSession } from '@proton/web-sdk';

export type XPRNMarketProviderResult = {
  pair: string,
  baseToken: string;
  baseContract: string;
  basePrecision: number;
  quoteToken: string;
  quoteContract: string;
  quotePrecision: number;
  minBuy: number;
  minSell: number;
  askName: string;
  bidName: string;
  ask: number,
  bid: number;
  lastPrice: number;
  baseTransactionMemo?: string;
  quoteTransactionMemo?: string;
}

export type XPRNSwapSide = 'buy' | 'sell';
export type XPRNMarketProvider = {
  endpoint: string;
  name: string;
  default?:boolean
  parse: (results: any[]) => XPRNMarketProviderResult[];
  getTransaction:(swapPair:XPRNMarketProviderResult,volume:number,price:number,side:XPRNSwapSide,session?:LinkSession)=>any[]
}

export type XPRNMarketProviderQuoteFilter = {
  baseSymbol?: string;
  quoteSymbol?: string;
};

export type XPRNSwapValues = {
  base: number;
  quote: number;
  volume: number;
  lastMutated:"base"|"quote"
};

export * from './xprn-swap-provider'
export * from './xprn-swap-markets-selector'
export * from './xprn-swap-pair-selector'
export * from './xprn-swap-layout'
export * from './xprn-swap-field'
export * from './xprn-swap-fields'
export * from './xprn-swap-fields-group'
export * from './xprn-swap-side-button'
export * from './xprn-swap'