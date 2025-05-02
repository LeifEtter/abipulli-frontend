import { OrderTable } from "./components/OrderTable";
import { genXOrders } from "./utilities/exampleData";
import { Sidebar } from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="text-ap-dark-blue-v2 flex flex-col items-center justify-start pt-10 h-full w-full">
      <button className="bg-white rounded-2xl py-2 px-6 mt-5 text-xl font-semibold shadow-ap-special-shadow">
        Admin Panel
      </button>
      <div className="w-11/12 flex bg-white max-w-7xl rounded-4xl shadow-ap-special-shadow mt-6">
        <div className="flex-1/6 max-w-xs flex flex-row justify-end">
          <Sidebar />
        </div>
        <div className="text-center flex-5/6 px-5 py-5">
          <h1 className="text-xl font-semibold">Main Content</h1>
          <div className="w-full bg-white rounded-2xl shadow-md">
            <OrderTable orders={genXOrders(50)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
