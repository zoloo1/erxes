import { IItem, IItemParams } from '../boards/types';
import { IProduct } from '@erxes/ui-products/src/types';

export interface IQueryParams {
  brandIds: string;
  integrationIds: string;
  boardId: string;
  pipelineIds: string;
  endDate: string;
  startDate: string;
}
export interface IPurchaseTotalAmount {
  _id: string;
  name: string;
  currencies: [
    {
      amount: number;
      name: string;
    }
  ];
}

export interface IDiscountValue {
  bonusName: string;
  discount: number;
  potentialBonus: number;
  sumDiscount: number;
  type: string;
  voucherCampaignId: string;
  voucherId: string;
  voucherName: string;
}
export interface IProductData {
  _id: string;
  productId?: string;
  product?: IProduct;
  uom?: string;
  currency?: string;
  quantity: number;
  unitPrice: number;
  globalUnitPrice: number;
  unitPricePercent: number;
  taxPercent: number;
  tax: number;
  vatPercent: number;
  discountPercent: number;
  discount: number;
  amount: number;
  tickUsed?: boolean;
  isVatApplied?: boolean;
  assignUserId?: string;
  maxQuantity: number;
  branchId?: string;
  departmentId?: string;
}

export interface IPaymentsData {
  [key: string]: {
    currency?: string;
    amount?: number;
  };
}
export interface ICostsData {
  _id: string;
  expenseId: string;
  code: string;
  name: string;
}

export interface ICost {
  _id: string;
  name: string;
  code: string;
}

export type PurchasesTotalAmountsQueryResponse = {
  purchasesTotalAmounts: IPurchaseTotalAmount[];
  refetch: () => void;
};

export interface IPurchase extends IItem {
  products?: any;
  paymentsData?: IPaymentsData;
  costsData?: ICostsData[];
}

export interface IPurchaseParams extends IItemParams {
  productsData?: IProductData[];
  paymentsData?: IPaymentsData;
  costsData?: ICostsData[];
}

export type PurchasesQueryResponse = {
  purchases: IPurchase[];
  loading: boolean;
  refetch: () => void;
  fetchMore: any;
};

export type PurchasesTotalCountQueryResponse = {
  purchasesTotalCount: number;
  loading: boolean;
  refetch: () => void;
  fetchMore: any;
};
