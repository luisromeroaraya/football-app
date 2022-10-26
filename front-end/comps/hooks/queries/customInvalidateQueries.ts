import { TQueries } from "./types";
import { queryClient } from "./queryClient";

export const customInvalidateQueries = (queries: TQueries) => {
  queries?.forEach((query) => queryClient.invalidateQueries(query));
};
