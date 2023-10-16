import { config } from "../lib/config";
import axios, { AxiosInstance } from "axios";
// import { AppsFetchPayload, UserAppFetchPayload } from "../lib/interfaces";

class AppService {
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

    this.fetchApps = this.fetchApps.bind(this);
    this.fetchUserApps = this.fetchUserApps.bind(this);
    this.fetchApp = this.fetchApp.bind(this);
  }

  public async fetchApps() {
    const { data } = await this.axiosInstance.get("/products");
    if (data.status === "success") {
      return data.data;
    }
    throw new Error(data.message || "Something went wrong");
  }

  public async fetchUserApps(idToken: string) {
    const { data } = await this.axiosInstance.get("/user/products", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    if (data.status === "success") {
      return data.data;
    }
    throw new Error(data.message || "Something went wrong");
  }

  public async fetchApp(idToken: string, isLive: boolean) {
    const { data } = await this.axiosInstance.get(
      `/product${isLive ? "?isLive=1" : ""}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    if (data.status === "success") {
      return data.data;
    }
    throw new Error(data.message || "Something went wrong");
  }

  public async getAffiliated(
    idToken: string,
    productId: string,
    isLive: boolean
  ) {
    const { data } = await this.axiosInstance.post(
      "/affiliate-code",
      {
        product_id: productId,
        is_live: isLive,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    if (data.status === "success") {
      return data;
    } else {
      throw new Error(data.message || "Something went wrong");
    }
  }
}

export default AppService;
