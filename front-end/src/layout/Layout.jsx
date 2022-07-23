import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";

const Layout = ({ children }) => {
  return (
    <div className="max-w-screen min-h-screen bg-primary flex flex-col overflow-hidden relative text-white">
      <Menu />
      <Header />
      <div className="flex flex-col overflow-y-scroll mx-8">{children}</div>
    </div>
  );
};

export default Layout;
