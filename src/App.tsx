import { OrderTable } from "./components/OrderTable";
import { genXOrders } from "./utilities/exampleData";
import { Sidebar } from "./components/sidebar/Sidebar";

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
