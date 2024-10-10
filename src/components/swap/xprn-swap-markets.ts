import { toPrecision } from "../../utils";
import type { XPRNMarketProvider, XPRNMarketProviderResult } from ".";

export enum DEFAULT_SERVICE_NAMES {
  ALCOR="Alcor",
  METALX = "MetalX",
  XPRSWAP="XPR Network Swap"
}

export const DEFAULT_SWAP_SERVICES: XPRNMarketProvider[] = [
  {
    name: DEFAULT_SERVICE_NAMES.ALCOR,
    endpoint: "https://proton.alcor.exchange/api/markets",
    default: true,
    parse: (result: any[]): XPRNMarketProviderResult[] => {
      return result.map(res => {
        return {
          pair: `${res.quote_token.symbol.name}/${res.base_token.symbol.name}`,
          askName: `${res.quote_token.symbol.name}/${res.base_token.symbol.name}`,
          bidName: `${res.base_token.name}/${res.quote_token.symbol.name}`,
          baseToken: res.base_token.symbol.name,
          basePrecision: res.base_token.symbol.precision,
          baseContract: res.base_token.contract,
          baseTransactionMemo:res.base_token.str,
          quoteToken: res.quote_token.symbol.name,
          quotePrecision: res.quote_token.symbol.precision,
          quoteContract: res.quote_token.contract,
          quoteTransactionMemo: res.quote_token.str,
          ask: res.ask,
          bid: res.bid,
          lastPrice: res.last_price,
          minBuy: res.min_buy,
          minSell: res.min_sell,
        };
      });
    },
    getTransaction(swapPair,volume,price,side,session) {
      if (!session) return []
      const contract = side == 'buy' ? swapPair.baseContract : swapPair.quoteContract;
      const symbol = side == 'buy' ? swapPair.baseToken : swapPair.quoteToken;
      const precision = side == 'buy' ? swapPair.basePrecision : swapPair.quotePrecision;
      const memoBase = side == 'buy' ? swapPair.quoteTransactionMemo : swapPair.baseTransactionMemo;
      return [
        {
          account: contract,
          name: "transfer",
          authorization: [
            {
              actor: session.auth.actor.toString(),
              permission: session.auth.permission.toString(),
            },
          ],
          data: {
            from: session.auth.actor.toString(),
            to: "alcor",
            quantity:`${toPrecision(volume,precision,"none",true)} ${symbol}`,
            memo:`${toPrecision(price,precision,"none",true)} ${memoBase}`
          },
        },
      ];
    },
  },
  // Need info 
  // {
  //   name: "MetalX",
  //   endpoint: "",
  //   parse: (result: any[]): XPRNMarketProviderResult[] => { 
  //     return []
  //   },
  //   getTransaction(swapPair, volume, side, session) {
  //     return []
  //   },
  // },
  
  // {
  //   name: "XPR Network",
  //   endpoint: "",
  //   parse: (result: any[]): XPRNMarketProviderResult[]=>{ 
  //     return []
  //   },
  //   getTransaction(swapPair, volume, side, session) {
  //     return []
  //   },
  // }
  
];

export function getSwapMarkets(filters?: string[]): XPRNMarketProvider[] {
  
  if (!filters) return DEFAULT_SWAP_SERVICES
  return DEFAULT_SWAP_SERVICES.reduce((prev: XPRNMarketProvider[], current: XPRNMarketProvider) => {
    const foundInFilter = filters.findIndex(filter=>current.name == filter)
    if (foundInFilter >= 0) prev.push(current);
    return prev;
  },[])

}
