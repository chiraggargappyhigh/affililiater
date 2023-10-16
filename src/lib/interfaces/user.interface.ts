enum UserType {
  admin = 0,
  affiliate = 1,
}

interface User {
  _id: string;
  firebaseUid: string;
  email: string;
  name: string;
  profile_pic?: string;
  type: UserType;
  total_earnings?: number;
  total_referrals?: number;
  total_sales?: number;
}

interface UserLoginPayload {
  firebaseUid: string;
  type?: UserType;
  googleToken: string;
}

export { User, UserType, UserLoginPayload };
