// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { Order } from "abipulli-types";
// import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
// import { DropdownButton } from "./dropdownButton";

//TODO Hide Overlay when reach bottom of div by scrolling
export const OrderTable: React.FC<{ orders: Order[] }> = ({ orders }) => (
  <div className="relative h-160">
    <div className="absolute bottom-0 w-full h-30 bg-gradient-to-b from-0% to-ap-medium-grey-half-opacity pointer-events-none rounded-xl">
      {/* <div className="flex w-full h-full flex-col justify-end font-semibold pb-2">
        <p>
          Weiter Scrollen <FontAwesomeIcon icon={faArrowDown} />
        </p>
      </div> */}
    </div>
    <table className="flex flex-col h-160">
      <thead className="w-full">
        <tr className="flex items-center *:border-gray-300 *:py-2 bg-ap-blue text-white rounded-t-md text-lg *:text-left *:pl-4">
          <th className="flex-1/12 border-r-2">ID</th>
          <th className="flex-2/12  border-r-2">Status</th>
          <th className="flex-3/12  border-r-2">Schule</th>
          <th className="flex-2/12  border-r-2">Motto</th>
          <th className="flex-2/12  border-r-2">Deadline</th>
          <th className="flex-3/12">Land</th>
        </tr>
      </thead>
      {/* //scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400
      scrollbar-track-gray-100 */}
      <tbody className="overflow-y-scroll rounded-b-xl">
        {orders.map((order) => (
          <tr
            key={`order-${orders.indexOf(order)}`}
            className="group flex *:border-b-2 *:border-ap-medium-grey border-x-2 border-ap-medium-grey *:flex *:justify-start *:px-3 *:py-2 bg-gray-100 cursor-pointer"
          >
            <td className="w-1/12 border-r-2">1</td>
            <td className="w-2/12 border-r-2">Designen</td>
            <td className="w-3/12 border-r-2">{order.school}</td>
            <td className="w-2/12 border-r-2">{order.motto}</td>
            <td className="w-2/12 border-r-2">
              {order.deadline.toLocaleDateString()}
            </td>
            <td className="w-3/12 justify-between">
              {order.schoolCountry}
              <div className="flex-auto"></div>
              <div className="hidden group-hover:flex flex-col justify-center items-center">
                <FontAwesomeIcon
                  icon={faBolt}
                  className="text-yellow-600"
                  width={10}
                />
                <p className="h-2 text-xs font-semibold">Aktion</p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
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
