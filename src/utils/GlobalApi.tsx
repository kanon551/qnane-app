import axios, { AxiosError } from "axios";


const key = 'api';
const version = 'v3';


export const authAxios = axios.create({
    baseURL: "https://api.binance.com",
    headers: {
      "Content-Type": "application/json",
    },
  });
  

export interface exchangeInfo {
  timezone: string;
  exchangeFilters: [];
  rateLimits: rateLimit[];
  serverTime: number;
  symbols: symbolDataType[]

}

interface rateLimit {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
}

interface symbolDataType {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: filterDataType[];
  permissions: string[];
}

interface filterDataType {
  filterType?: string;
  minPrice?: string;
  maxPrice?: string;
  tickSize?: string;
  multiplierUp?: string;
  multiplierDown?: string;
  avgPriceMins?: number;
  minQty?: string;
  maxQty?: string;
  stepSize?: string;
  minNotional?: string;
  applyToMarket?: boolean;
  limit?: number;
  maxNumOrders?: number;
  maxNumAlgoOrders?: number;
  maxPosition?: string;
  defaultTakerFee?: string;
  defaultMakerFee?: string;
  makerFeeRate?: string;
  takerFeeRate?: string;
  maxFundingCurrencies?: number;
  creditDebitFee?: creditDebitFeeDataType[];
}

interface creditDebitFeeDataType {
  currency: string;
  feeTier: number;
  makerFee: string;
  takerFee: string;
}

export const getSymbols = async () => {
    try {
      const res = await authAxios.get(`/${key}/${version}/exchangeInfo`);
      return res.data;
    }
    catch (err) {
      const error = err as AxiosError;
      return error.response?.data;
    }
  
  };

  export const getPrices = async (symbol: string) => {
    try {
      const res = await authAxios.get(`/${key}/${version}/trades?symbol=${symbol}`);
      return res.data;
    }
    catch (err) {
      const error = err as AxiosError;
      return error.response?.data;
    }
  
  };


  export const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'OrderLineID', headerName: 'Order Line Id'},
    { field: 'OrderID', headerName: 'Order ID'},
    { field: 'Description', headerName: 'Description', width: 380},
    { field: 'PackageTypeID', headerName: 'Package ID'},
    { field: 'Quantity', headerName: 'Quantity'},
    { field: 'StockItemID', headerName: 'StockItem ID'},
    { field: 'UnitPrice', headerName: 'Unit Price'},
  ];