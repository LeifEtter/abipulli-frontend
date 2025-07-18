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
import { UserApi } from "src/api/endpoints/user";
import { OrderApi } from "src/api/endpoints/order";
export type UserErrors = { [K in keyof Partial<User>]?: string };
export type OrderErrors = { [K in keyof Partial<Order>]?: string };

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const [userInfo, setUserInfo] = useState<Partial<User>>({
    gender: "weiblich",
    mobileCountryCode: "+49",
    birthdate: new Date(),
  });
  const [userErrors, setUserErrors] = useState<UserErrors>({});
  const [orderInfo, setOrderInfo] = useState<Partial<Order>>({
    deadline: new Date(),
    schoolCountryCode: "DE",
    graduationYear: 2025,
  });
  const [orderErrors, setOrderErrors] = useState<OrderErrors>({});

  const validateUserInfo = (): boolean => {
    const parseResult = UserCreateParamsSchema.safeParse(userInfo);
    if (!parseResult.success) {
      let newErrors = {};
      for (const error of parseResult.error.issues) {
        newErrors = {
          ...newErrors,
          [error.path[0] as keyof UserCreateParams]: error.message,
        };
      }
      setUserErrors(newErrors);
      return false;
    }
    return true;
  };

  const validateOrderInfo = (): boolean => {
    const parseResult = OrderCreateParamsSchema.safeParse(orderInfo);
    if (!parseResult.success) {
      let newErrors = {};
      for (const error of parseResult.error.issues) {
        newErrors = {
          ...newErrors,
          [error.path[0] as keyof OrderCreateParams]: error.message,
        };
      }
      setOrderErrors(newErrors);
      return false;
    }
    return true;
  };

  const saveOrderInfoToLocalStorage = () => {
    const stringifiedState = JSON.stringify(orderInfo);
    localStorage.setItem("orderInfo", stringifiedState);
  };

  const retrieveOrderInfoFromLocalStorage = () => {
    const raw: string | null = localStorage.getItem("orderInfo");
    if (!raw) return;
    const result = OrderCreateParamsSchema.partial()
      .nullable()
      .safeParse(JSON.parse(raw));
    if (result.data) setOrderInfo(result.data);
  };

  const submitRegister = async (): Promise<void> => {
    const user: UserCreateParams | undefined =
      UserCreateParamsSchema.safeParse(userInfo).data;
    if (!user) throw "Nutzer Account konnte nicht erstellt werden";
    await UserApi.create(user);
  };

  const submitOrder = async (): Promise<void> => {
    const order: OrderCreateParams | undefined =
      OrderCreateParamsSchema.safeParse(orderInfo).data;
    if (!order) throw "Schuldaten konnten nicht übermittelt werden";
    await OrderApi.create(order);
  };

  useEffect(() => {
    retrieveOrderInfoFromLocalStorage();
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
        orderInfo,
        setOrderInfo: (e: Partial<Order>) => {
          setOrderInfo((prev) => ({ ...prev, ...e }));
          setOrderErrors((prev) => ({
            ...prev,
            [Object.keys(e)[0]]: undefined,
          }));
        },
        orderErrors,
        saveOrderInfoToLocalStorage,
        retrieveOrderInfoFromLocalStorage,
        validateOrderInfo,
        validateUserInfo,
        submitOrder,
        submitRegister,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
