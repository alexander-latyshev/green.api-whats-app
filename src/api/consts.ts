import { IAccount } from "../models/account";

export const HOST: string = "https://api.green-api.com";
export const STORAGE_USER: IAccount = JSON.parse(localStorage.getItem("user") || 'null');