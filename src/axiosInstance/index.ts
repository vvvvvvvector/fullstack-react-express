import axios, { AxiosRequestConfig } from "axios";

import { baseUrl } from "./constants";

import { getUserToken } from "../common/utils";

export const getJWTHeader = () => {
  const token = getUserToken();

  return { Authorization: `Bearer ${token}` };
};

const config: AxiosRequestConfig = { baseURL: baseUrl };

export const axiosInstanse = axios.create(config);
