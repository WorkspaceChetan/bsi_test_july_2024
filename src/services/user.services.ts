import axios, { AxiosError } from "axios";
import { AllUsers, AllUsersParams, User } from "./types";
import { toast } from "react-toastify";

export class UserService {
  static getAllUser = async ({ limit, skip }: AllUsersParams) => {
    try {
      const res = await axios.get<AllUsers>(
        `${process.env.NEXT_PUBLIC_API_ENDPIONT}/users?limit=${limit}&skip=${skip}`
      );

      return res.data;
    } catch (err: any) {
      return {
        error: "Something went wrong! Please try again later.",
      } as AllUsers;
    }
  };

  static getSearchUserData = async (
    searchText: string,
    limit: number,
    skip: number
  ) => {
    try {
      const res = await axios.get<AllUsers>(
        `${process.env.NEXT_PUBLIC_API_ENDPIONT}/users/search?q=${searchText}&limit=${limit}&skip=${skip}`
      );

      return res.data;
    } catch (err: any) {
      return {
        error: "Something went wrong! Please try again later.",
      } as AllUsers;
    }
  };

  static getUserById = async (id: number) => {
    try {
      const res = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_API_ENDPIONT}/users/${id}`
      );

      return res.data;
    } catch (err: any) {
      toast.error("Something went wrong! Please try again later.");
    }
  };
}
