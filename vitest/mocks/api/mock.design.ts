import { Design } from "abipulli-types";
import { DesignFactory } from "../data/factory.design";

export const DesignsApi = {
  retrieveOrderDesigns: async (orderNumber: number): Promise<Design[]> =>
    DesignFactory.getDesigns({
      orderId: orderNumber,
      amount: 10,
      customerId: 5,
    }),
  retrieveSingleDesign: async (id: number): Promise<Design> =>
    DesignFactory.getSingleDesign({ id: id, orderId: 5, customerId: 5 }),
  
};
