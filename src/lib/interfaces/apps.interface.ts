import { User } from ".";
interface App {
  _id: string;
  name: string;
  description: string;
  logo?: string;
  homepage?: string;
  privacy_policy?: string;
  terms_and_conditions?: string;
  contact_email?: string;
  admins: User[] | string[];
  default_config: {
    coupon_discount: number;
    commission: {
      [stripeProductId: string]: number;
    };
  };
  stripe: {
    test_key: string;
    live_key: string;
    test_webhook_secret: string;
    live_webhook_secret: string;
  };
}

interface UserAppFetchPayload {
  liveData: boolean;
}

export { App, UserAppFetchPayload };
