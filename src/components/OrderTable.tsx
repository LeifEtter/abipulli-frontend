import { PulloverOrder } from "../types/order";
import { DropdownButton } from "./dropdownButton";

export const OrderTable: React.FC<{ orders: PulloverOrder[] }> = ({
  orders,
}) => (
  <table className="flex">
    <thead>
      <tr>
        <th>
          <DropdownButton
            options={[
              { name: "Option 1", id: 1 },
              { name: "Option 2", id: 2 },
            ]}
            callback={(id: number) => console.log(id)}
          />
        </th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr
          key={`order-${orders.indexOf(order)}`}
          className="flex flex-row"
        ></tr>
      ))}
    </tbody>
  </table>
);
