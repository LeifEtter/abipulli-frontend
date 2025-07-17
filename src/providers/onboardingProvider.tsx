import { ReactElement, useEffect, useState } from "react";
import { OnboardingContext } from "./onboardingContext";
import {
  OnboardingInfo,
  OnboardingInfoSchema,
  Order,
  OrderSchema,
  User,
  UserSchema,
} from "abipulli-types";
import { ZodSafeParseResult } from "zod";
import { UserApi } from "src/api/endpoints/user";

// export type OnboardingErrors = {
//   [K in keyof OnboardingInfo]?: string | null;
// };

export type UserErrors = { [K in keyof Partial<User>]?: string };
export type OrderErrors = { [K in keyof Partial<Order>]?: string };

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const [userInfo, setUserInfo] = useState<Partial<User>>({});
  const [userErrors, setUserErrors] = useState<UserErrors>({});
  const [orderInfo, setOrderInfo] = useState<Partial<Order>>({});
  const [orderErrors, setOrderErrors] = useState<OrderErrors>({});

  const validateUserInfo = async () => {
    const parseResult = UserSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    }).safeParse(userInfo);
    if (!parseResult.success) {
      // const errors = parseResult.error;
      // console.log(errors);
      return;
    }
    const user: Omit<User, "id" | "createdAt" | "updatedAt"> = parseResult.data;
    // Call API
  };

  const validateOrderInfo = async () => {
    const parseResult = OrderSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    }).safeParse(orderInfo);
    console.log("PARSED");
    if (!parseResult.success) {
      for (let error of parseResult.error.issues) {
        console.log("ERROR");
        console.log(error);
      }
      return;
    }
    const order: Omit<Order, "id" | "createdAt" | "updatedAt"> =
      parseResult.data;
    // Call API
  };

  const clearUserError = (key: keyof UserErrors) =>
    setUserErrors((prev) => ({ ...prev, [key]: undefined }));

  const clearOrderError = (key: keyof OrderErrors) =>
    setOrderErrors((prev) => ({ ...prev, [key]: undefined }));

  // const setError = ([k, v]: [k: keyof OnboardingErrors, v: string]) => {
  //   setErrorState((prev) => ({ ...prev, [k]: v }));
  // };

  // //TODO save onboarding process in localstorage
  // const saveProgressLocally = (state: Partial<OnboardingInfo>) => {
  //   setState((prev) => ({ ...prev, ...state }));
  // };

  // const saveToLocalStorage = () => {
  //   const { password, ...stateWithoutPassword } = state;
  //   const stringifiedState = JSON.stringify(stateWithoutPassword);
  //   localStorage.setItem("onboardingInfo", stringifiedState);
  // };

  // const retrieveFromLocalStorage = (): boolean => {
  //   const raw: string | null = localStorage.getItem("onboardingInfo");
  //   if (!raw) return false;
  //   const parsed = JSON.parse(raw);
  //   const result = OnboardingInfoSchema.partial().nullable().safeParse(parsed);
  //   if (!result.success) return false;
  //   setState((prev) => ({ ...prev, ...result.data }));
  //   return true;
  // };

  //TODO submit onboarding progress to backend
  const submitProgress = () => {
    // Validate
  };

  const submitUserInfo = () => {
    validateUserInfo();
  };

  const submitOrderInfo = () => {
    validateOrderInfo();
  };

  // TODO get progress from backend
  const getProgress = () => {};

  useEffect(() => {
    // TODO initialize stuff
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        userInfo,
        setUserInfo: (e: Partial<User>) => {
          setUserInfo((prev) => ({ ...prev, ...e }));
          setUserErrors((prev) => ({
            ...prev,
            [Object.keys(e)[0]]: undefined,
          }));
        },
        userErrors,
        clearUserError,
        orderInfo,
        setOrderInfo: (e: Partial<Order>) => {
          setOrderInfo((prev) => ({ ...prev, ...e }));
          setOrderErrors((prev) => ({
            ...prev,
            [Object.keys(e)[0]]: undefined,
          }));
        },
        orderErrors,
        clearOrderError,
        // ...state,
        // errorState,
        // clearError,
        // saveProgressLocally,
        submitProgress,
        getProgress,
        // setError,
        // saveToLocalStorage,
        // retrieveFromLocalStorage,
        submitUserInfo,
        submitOrderInfo,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
