import axios, { AxiosRequestConfig } from "axios";

export const getRequest = <T>(url: string, config?: AxiosRequestConfig<T>) =>
  axios.get(url, config).then((res) => res.data);

export const putRequest = <T>(
  url: string,
  values: T,
  config?: AxiosRequestConfig<T>,
) => axios.put(url, values, config).then((res) => res.data);

export const postRequest = <T>(
  url: string,
  values: T,
  config?: AxiosRequestConfig<T>,
) => axios.post(url, values, config).then((res) => res.data);

export const deleteRequest = (url: string) =>
  axios.delete(url).then((res) => res.data);
