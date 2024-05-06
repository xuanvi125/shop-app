import { Outlet } from "react-router-dom";

import Header from "../components/Header";
function AppLayout() {
  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
