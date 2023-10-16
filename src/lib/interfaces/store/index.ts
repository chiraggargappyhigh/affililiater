import { AuthState } from "./auth.interface";
import { AppState } from "./apps.interface";

interface Store {
  auth: AuthState;
  app: AppState;
}

interface EmptyAction {
  type: string;
}

export { Store, EmptyAction };

export * from "./auth.interface";
export * from "./apps.interface";
