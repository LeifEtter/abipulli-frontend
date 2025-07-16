import { OnboardingInfo, Order, User } from "abipulli-types";
import { createContext, Dispatch, SetStateAction } from "react";
import { OrderErrors, UserErrors } from "./onboardingProvider";

export interface OnboardingContextType {
  userInfo: Partial<User>;
  setUserInfo: (e: Partial<User>) => void;
  userErrors: UserErrors;
  clearUserError: (key: keyof UserErrors) => void;

  orderInfo: Partial<Order>;
  setOrderInfo: (e: Partial<Order>) => void;
  orderErrors: UserErrors;
  clearOrderError: (key: keyof OrderErrors) => void;

  // saveProgressLocally: (state: Partial<OnboardingInfo>) => void;
  submitProgress: () => void;
  getProgress: () => void;
  // saveToLocalStorage: () => void;
  // retrieveFromLocalStorage: () => void;
  submitUserInfo: () => void;
  submitOrderInfo: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
);
