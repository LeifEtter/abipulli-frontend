const SidebarButton: React.FC<{ text: string }> = ({ text }) => (
  <button>{text}</button>
);

const Sidebar: React.FC = () => (
  <div className="flex flex-col border-4 border-red-500 h-full">
    <SidebarButton text="Dashboard" />
  </div>
);

function App() {
  return (
    <body className="bg-ap-off-white-blue flex flex-row border-2 border-yellow-500 h-full">
      <Sidebar />
    </body>
  );
}

export default App;
