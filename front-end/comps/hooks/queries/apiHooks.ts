import {
  IDeleteMutationParams,
  IGetParameters,
  IOptimisticMutationsParams,
  IUseCustomMutation,
} from "./types";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../api/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { customInvalidateQueries } from "./customInvalidateQueries";
import { queryClient } from "./queryClient";

const useCustomMutation = <TPreviousItems, TNewItem>({
  request,
  url,
  optimisticQuery,
  config,
  updater,
  queries,
  toastText,
  onSuccess,
}: IUseCustomMutation<TPreviousItems, TNewItem>) =>
  useMutation((values) => request(url || "", values, config), {
    onMutate: async (newItem: TNewItem) => {
      if (optimisticQuery) {
        await queryClient.cancelQueries(optimisticQuery);
        const previousItems: TPreviousItems | undefined =
          queryClient.getQueryData(optimisticQuery);
        if (updater)
          queryClient.setQueryData<TPreviousItems>(
            optimisticQuery,
            (previousItems) => updater(previousItems, newItem),
          );
        return { previousItems };
      }
    },
    onSuccess: (res) => {
      if (onSuccess) onSuccess(res);
      console.log(res); // FIX ME/ ADD TOAST
    },
    onError: (error: AxiosError, _, context) => {
      console.error(error); // FIX ME/ ADD TOAST
      optimisticQuery &&
        queryClient.setQueryData(optimisticQuery, context?.previousItems);
    },
    onSettled: () => {
      queries && customInvalidateQueries(queries);
    },
  });

export const useGetData = <T>({
  query,
  url,
  config,
  options,
}: IGetParameters<T>) =>
  useQuery<T>(query, () => getRequest(url, config), options);

export const usePostData = <TPreviousItems, TNewItem>({
  url,
  queries,
  optimisticQuery,
  updater,
  config,
  onSuccess,
}: IOptimisticMutationsParams<TPreviousItems, TNewItem>) =>
  useCustomMutation<TPreviousItems, TNewItem>({
    request: postRequest,
    url,
    queries,
    optimisticQuery,
    updater,
    config,
    onSuccess,
  });

export const usePatchData = <TPreviousItems, TNewItem>({
  url,
  queries,
  optimisticQuery,
  updater,
  config,
  onSuccess,
}: IOptimisticMutationsParams<TPreviousItems, TNewItem>) =>
  useCustomMutation<TPreviousItems, TNewItem>({
    request: patchRequest,
    url,
    queries,
    optimisticQuery,
    updater,
    config,
    onSuccess,
  });

export const useDeleteData = <TPreviousItems, TNewItem>({
  url,
  queries,
  toastText,
  updater,
  optimisticQuery,
}: IDeleteMutationParams<TPreviousItems, TNewItem>) =>
  useCustomMutation<TPreviousItems, TNewItem>({
    request: deleteRequest,
    optimisticQuery,
    url,
    queries,
    toastText,
    updater,
  });
