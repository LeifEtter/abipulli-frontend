import { ReactElement, useEffect, useState } from "react";
import { OnboardingContext } from "./onboardingContext";
import {
  Order,
  OrderCreateParams,
  OrderCreateParamsSchema,
  User,
  UserCreateParams,
  UserCreateParamsSchema,
} from "abipulli-types";
// import { UserApi } from "src/api/endpoints/user";

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

  // Replace with normal ZodIssue when it becomes available i guess
  const getErrorString = (issue: any): string => {
    console.log(issue);
    return "";
  };

  const validateUserInfo = async () => {
    const parseResult = UserCreateParamsSchema.safeParse(userInfo);
    if (!parseResult.success) {
      let newErrors = {};
      for (const error of parseResult.error.issues) {
        newErrors = {
          ...newErrors,
          [error.path[0] as keyof UserCreateParams]: getErrorString(error),
        };
      }
      return setUserErrors(newErrors);
    }
    const user: UserCreateParams = parseResult.data;
  };

  const validateOrderInfo = async () => {
    const parseResult = OrderCreateParamsSchema.safeParse(orderInfo);
    if (!parseResult.success) {
      let newErrors = {};
      for (const error of parseResult.error.issues) {
        newErrors = {
          ...newErrors,
          [error.path[0] as keyof OrderCreateParams]: getErrorString(error),
        };
      }
      return setOrderErrors(newErrors);
    }
    const order: OrderCreateParams = parseResult.data;
    // API
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
