import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

import { AxiosRequestConfig } from "axios";

export type TQueries = QueryKey[] | undefined;
export interface IGetParameters<T> {
  query: QueryKey;
  url: string;
  config?: Record<string, unknown>;
  options?: UseQueryOptions<T>;
}
export interface IOptimisticMutationsParams<TPreviousItems, TNewItem> {
  url?: string;
  queries?: TQueries;
  optimisticQuery?: QueryKey;
  updater?: (
    previousItems?: TPreviousItems,
    newItem?: TNewItem,
  ) => TPreviousItems | undefined;
  config?: AxiosRequestConfig;
  onSuccess?: (res: TNewItem) => void;
}

export interface IUseCustomMutation<TPreviousItems, TNewItem>
  extends IOptimisticMutationsParams<TPreviousItems, TNewItem> {
  request: (
    url: string,
    values: TNewItem,
    config?: AxiosRequestConfig,
  ) => Promise<TNewItem>;
  toastText?: string;
}

export interface IDeleteMutationParams<TPreviousItems, TNewItem>
  extends IOptimisticMutationsParams<TPreviousItems, TNewItem> {
  toastText: string;
}
