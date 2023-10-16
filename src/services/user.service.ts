import { config } from "../lib/config";
import axios, { AxiosInstance } from "axios";
import { UserLoginPayload } from "../lib/interfaces";

class UserService {
  private readonly baseURL: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.baseURL = config.apiURL;
    this.axiosInstance = axios.create({
      baseURL: `${this.baseURL}/app/api/v1`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.addOrUpdateUser = this.addOrUpdateUser.bind(this);
  }

  public async addOrUpdateUser(payload: UserLoginPayload) {
    const { data } = await this.axiosInstance.post("/user/user-login", payload);
    if (data.status === "success") {
      return data.data;
    }
    throw new Error(data.message || "Something went wrong");
  }

  public async fetchUser(idToken: string) {
    const { data } = await this.axiosInstance.get("/user", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    if (data.status === "success") {
      return data.data;
    }
    throw new Error(data.message || "Something went wrong");
  }

  public async fetchUserTransactions(idToken: string) {
    const { data } = await this.axiosInstance.get("/sales-by-user", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (data.status === "success") {
      return data.data;
    }

    throw new Error(data.message || "Something went wrong");
  }
}

export default UserService;
