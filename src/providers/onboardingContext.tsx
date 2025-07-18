import { Order, User } from "abipulli-types";
import { createContext } from "react";
import { OrderErrors, UserErrors } from "./onboardingProvider";

export interface OnboardingContextType {
  userInfo: Partial<User>;
  setUserInfo: (e: Partial<User>) => void;
  userErrors: UserErrors;

  orderInfo: Partial<Order>;
  setOrderInfo: (e: Partial<Order>) => void;
  orderErrors: OrderErrors;

  validateUserInfo: () => boolean;
  validateOrderInfo: () => boolean;

  submitRegister: () => Promise<void>;
  submitOrder: () => Promise<void>;

  saveOrderInfoToLocalStorage: () => void;
  retrieveOrderInfoFromLocalStorage: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
);
