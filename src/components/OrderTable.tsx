import { PulloverOrder } from "../types/order";
// import { DropdownButton } from "./dropdownButton";

export const OrderTable: React.FC<{ orders: PulloverOrder[] }> = ({
  orders,
}) => (
  <table className="flex flex-col">
    <thead className="w-full">
      <tr className="flex *:border-r">
        <th className="flex-1/12">ID</th>
        <th className="flex-1/12">Status</th>
        <th className="flex-3/12">Schule</th>
        <th className="flex-2/12">Motto</th>
        <th className="flex-2/12">Deadline</th>
        <th className="flex-3/12">Land</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr
          key={`order-${orders.indexOf(order)}`}
          className="flex  *:border-r "
        >
          <td className="flex-1/12">1</td>
          <td className="flex-2/12">Designen</td>
          <td className="flex-3/12">{order.school_name}</td>
          <td className="flex-2/12">{order.motto}</td>
          <td className="flex-2/12">{order.deadline.toLocaleDateString()}</td>
          <td className="flex-3/12">{order.destination_country}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

{
  /* <DropdownButton
            options={[
              { name: "Option 1", id: 1 },
              { name: "Option 2", id: 2 },
            ]}
            callback={(id: number) => console.log(id)}
          /> */
}
