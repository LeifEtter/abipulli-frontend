import {
  faFlaskVial,
  faHome,
  faTruckFast,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { genXOrders } from "./utilities/exampleData";
import { OrderTable } from "./components/orderTable";

const SidebarButton: React.FC<{
  text: string;
  icon: IconDefinition;
  selected?: boolean;
}> = ({ text, icon, selected = false }) => {
  return (
    <button
      className={`w-10/12 max-w-50 gap-3 flex flex-row px-5 py-2 rounded-4xl hover:cursor-pointer ${
        selected ? "bg-ap-dark-blue-v2 text-white" : ""
      }`}
    >
      <FontAwesomeIcon icon={icon} size={"lg"} className="w-1/4" />
      <a className="w-3/4 text-md flex justify-start font-semibold">{text}</a>
    </button>
  );
};

const Sidebar: React.FC = () => (
  <aside className="flex flex-col p-3 border h-full w-full">
    <h1 className="font-bold text-xl text-center py-5">Navigation</h1>
    <nav>
      <SidebarButton text="Home" icon={faHome} selected={true} />
      <SidebarButton text="Bestellungen" icon={faTruckFast} />
      <SidebarButton text="Benutzer" icon={faUser} />
      <SidebarButton text="Testing" icon={faFlaskVial} />
    </nav>
  </aside>
);

function App() {
  return (
    <div className="bg-ap-bg text-ap-dark-blue-v2 flex flex-row h-full w-full">
      <section className="flex-2/6 max-w-xs flex flex-row justify-end">
        <Sidebar />
      </section>
      <section className="text-center flex-4/6 px-5 py-5">
        <h1>Main Content</h1>
        <div className="w-full bg-white rounded-2xl shadow-md">
          <OrderTable orders={genXOrders(50)} />
        </div>
      </section>
    </div>
  );
}

export default App;
